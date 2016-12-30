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
            if(taskData.status){
                task.done = true
            }else{
                task.done = false
            }

            console.log(task.assignUser)
            if(taskData.assignUser > 0){
                yield task.assignees().attach([taskData.assignUser])
            }

            yield task.save()
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
            newTask.creator_id = req.currentUser.id
            newTask.category_id = taskData.category_id
            newTask.title = taskData.title
            newTask.description = taskData.description
            yield newTask.save()
            yield newTask.assignees().attach([req.currentUser.id])
        }

        res.redirect(`/task/${newTask.id}`)

    }

    * doDelete (req, res) {
        const task = yield Task.find(req.param('id'))

        yield task.delete()

        res.redirect(`/user/${req.currentUser.id}`)
    }

    * motivate (req, res) {
        const msgno = Math.floor((Math.random() * 10));
        const msgs = [  "You can do it!",
                        "I believe in you!",
                        "Get off yer lazy ass and get to work!",
                        "Do, or do not, there is no try.",
                        "Don't be a lazy cunt, mate!",
                        "Dude, sucking at something is the first step to becoming sorta good at something",
                        "Responsiblity demands sacrifice",
                        "You're getting all hung up, all hung up on imaginary problems. You gotta focus on what's real, man. ",
                        "With great power comes great responsibility",
                        "Do it, just do it! Don’t let your dreams be dreams. Yesterday you said tomorrow. So just do it! Make your dreams come true. Just do it. Some people dream of success, while you’re going to wake up and work hard at it. Nothing is impossible… you should get to the point where anyone else would quit and you’re not going to stop there. NO! What are you waiting for?! DO IT! JUST DO IT! YES YOU CAN! JUST DO IT! If you’re tired of starting over, stop giving up."];
        res.ok({ success: true , message: msgs[msgno]});
    }
}

module.exports = TaskController
