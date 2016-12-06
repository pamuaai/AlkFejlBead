'use strict'

const Category = use('App/Model/Category')
const Validator = use('Validator')

class CategoryController {
    * create (req, res){
        yield res.sendView('categoryCreate')
    }

    * doCreate (req, res){
        const cat = new Category
        // 1. input bekérés
        const catData = req.all()

         // 2. validálás
        const rules = {
            'name': 'required|min:3',
        }
        

        const validation = yield Validator.validateAll(catData, rules)
        if (validation.fails()) {
            yield req
                .with({ errors: validation.messages() })
                .flash()
        } else {
            cat.name = catData.name
            yield cat.save()
        }
        res.redirect(`/category/list`)
    }

    * list (req, res){
        const categories = yield Category.all()

        yield res.sendView('categories', {
            categories: categories.toJSON()
        })

    }

    * show (req, res){
        const catId = req.param('id')
        const cat = yield Category.query().where('id', catId).first()

        yield res.sendView('categoryEdit', {
            cat: cat.toJSON()
        })
    }

    * doEdit (req, res){
        const catId = req.param('id')
        const cat = yield Category.query().where('id', catId).first()

        // 1. input bekérés
        const catData = req.all()



        // 2. validálás
        const rules = {
            'name': 'required|min:3',
        }

        const validation = yield Validator.validateAll(catData, rules)
        if (validation.fails()) {
            yield req
                .with({ errors: validation.messages() })
                .flash()
        } else {
            cat.name = catData.name
            yield cat.save()
        }

        res.redirect(`/category/list`)

    }

    * doDelete (req, res) {
        const cat = yield Category.find(req.param('id'))

        yield cat.delete()

        res.redirect('/category/list')
    }
}

module.exports = CategoryController
