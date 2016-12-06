'use strict'

const Lucid = use('Lucid')

class Task extends Lucid {
    category () {
        return this.belongsTo('App/Model/Category')
    }

  creator () {
    return this.belongsTo('App/Model/User', 'id', 'creator_id')
  }

  assignees () {
    return this.belongsToMany('App/Model/User', 'user_task', 'task_id', 'user_id')
  }

}

module.exports = Task
