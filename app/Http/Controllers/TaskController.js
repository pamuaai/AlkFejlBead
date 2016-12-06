'use strict'

const Category = use('App/Model/Category')
const User = use('App/Model/User')
const Task = use('App/Model/Task')
const Validator = use('Validator')

class TaskController {
    * show (req, res) {
        const taskId = req.param('id')
        const task = yield Task.query().with('creator', 'category').where('id', taskId).first()
        const categories = yield Category.all()
        const assignees = yield task.assignees().fetch()
        //const allUsers = yield User.all()
        const usersNotAssigned = yield User.query().whereNotIn('id', assignees.toJSON().map(user => user.id)).fetch()
        yield res.sendView('task', {
            task: task.toJSON(),
            categories: categories.toJSON(),
            assignees: assignees.toJSON(),
            usersNotAssigned: usersNotAssigned.toJSON()
        })
    }

    * doEdit (req, res) {
        const taskId = req.param('id')
        const task = yield Task.find(taskId)

        // 1. input bekérés
        const taskData = req.all()

        // 2. validálás
        const rules = {
            'title': 'required|min:3',
            'category_id': 'required',
            'description': 'required|min:3',
        }

        const validation = yield Validator.validateAll(taskData, rules)
        if (validation.fails()) {
            yield req
                .with({ errors: validation.messages() })
                .flash()
        } else {
            task.category_id = taskData.category_id
            task.title = taskData.title
            task.description = taskData.description
            yield task.save()


            if(task.assignUser !== "-1"){
                yield task.assignees().attach([task.assignUser])
            }
        }

        res.redirect(`/task/${taskId}`)
    }


    * create (req, res) {
        const categories = yield Category.all()

        yield res.sendView('taskCreate', {
            categories: categories.toJSON()
        })
    }

    * doCreate (req, res) {
        const newTask = new Task

        // 1. input bekérés
        const taskData = req.all()


        // 2. validálás
        const rules = {
            'title': 'required|min:3',
            'category_id': 'required',
            'description': 'required|min:3',
        }

        const validation = yield Validator.validateAll(taskData, rules)
        if (validation.fails()) {
            yield req
                .with({ errors: validation.messages() })
                .flash()
        } else {
            newTask.creator_id = 1
            newTask.category_id = taskData.category_id
            newTask.title = taskData.title
            newTask.description = taskData.description
            yield newTask.save()
        }

        res.redirect(`/task/${newTask.id}`)

    }


}

module.exports = TaskController
