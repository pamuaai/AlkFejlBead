'use strict'

class TaskController {
    * hello (req, res){
        yield res.sendView('hello', {
        })
    }
}

module.exports = TaskController
