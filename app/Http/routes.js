'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route') 
Route.get('/', 'UserController.login')

Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')
Route.get('/user/:id', 'UserController.profile')

Route.get('/category/create', 'CategoryController.create')
Route.post('/category/create', 'CategoryController.doCreate')

Route.get('/category/list', 'CategoryController.list')
Route.get('/category/:id', 'CategoryController.show')
Route.post('/category/:id', 'CategoryController.doEdit')
Route.get('/category/:id/delete', 'CategoryController.doDelete')


Route.get('/task/create', 'TaskController.create')
Route.post('/task/create', 'TaskController.doCreate')
Route.get('/task/:id', 'TaskController.show')
Route.post('/task/:id/edit', 'TaskController.doEdit')
Route.get('/task/:id/delete', 'TaskController.doDelete')

Route.group('ajax', function () {
    Route.get('/task/motivate', 'TaskController.motivate')
    Route.delete('/task/:id/delete', 'TaskController.doAjaxDelete')
    Route.delete('/category/:id/delete', 'CategoryController.doAjaxDelete')
 }).prefix('/ajax')
 