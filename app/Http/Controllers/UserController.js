'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Task = use('App/Model/Task')
const Hash = use('Hash')


class UserController {
    * register (req, res) {
        yield res.sendView('register')
    }

    * login (req, res) {
        yield res.sendView('login')
    }

    *doLogin (req, res) {
        const email = req.input('email')
        const password = req.input('password')

        try {
            yield req.auth.attempt(email, password)
            // oké volt
            res.redirect('/dashboard')
        } catch (ex) {
            // gond volt
            yield req
                .with({ error: 'Rossz belépési adatok.' })
                .flash()
            
            res.redirect('/')
        } 
    }

    * doRegister (req, res) {
        // 1. input adatok kinyerése
        const userData = req.all()

        // 2. kinyert adatok validálása
        const rules = {
            'email': 'required|email',
            'name': 'required',
            'password': 'required|min:4',
            'password_again': 'required|same:password'
        }

        const validation = yield Validator.validateAll(userData, rules)

        if (validation.fails()) {
            yield req
                .withOut('password', 'password_again')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/register')
            return
        }

        // 3. business logic
        const user = new User
        user.username = userData.name
        user.email = userData.email
        user.password = yield Hash.make(userData.password)

        yield user.save()
        yield req.auth.login(user)

        // 4. válasz generálása
        res.redirect(`/user/${user.id}`)
    }

    * profile (req, res){
        const userId = req.param('id')
        const user = yield User.query().where('id', userId).first()

        const tasks = yield user.assignedTasks().fetch()

        yield res.sendView('profile', {
            user: user.toJSON(),
            tasks: tasks.toJSON()
        })
    }
}

module.exports = UserController
