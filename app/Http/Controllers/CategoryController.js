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
        res.redirect(`/user/${req.currentUser.id}`)
    }
}

module.exports = CategoryController
