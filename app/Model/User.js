'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  createdTasks () {
    return this.hasMany('App/Model/Task', 'id', 'creator_id')
  }

  assignedTasks () {
    return this.belongsToMany('App/Model/Task', 'user_task', 'user_id', 'task_id')
  }

}

module.exports = User
