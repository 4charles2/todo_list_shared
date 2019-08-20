/**
 * Gestionnaire de la todolist
 * Effectue les ajout supression et / ou modification de la liste des tâches
 * @author Tognol Charles
 * @description class de gestion des evenements de la todolist
 * @summary class gestion de todolist
 * @version 0.1.0
 * @tutorial me
 *
 * @file class HandleTodoList
 * @licence MIT
 *
 *
 * @since 0.1.0
 * @copyright Tognol Charles ©2019
 * @see [charles-tognol]{@link https://charles-tognol.fr}
 */
class HandleTodolist {

    constructor() {
        this.todolist = []
    }

    /**
     * Ajoute la tâche à la todolist si test OK
     * Puis execute une des fonctions callbacks
     * @param {string} task
     * @param {{'error': function, 'work': function}} callbacks de callbacks @typedef {}
     *
     * @exemple
     *      add('manger', {'error': function(), 'work': function()})
     * @see [charles-tognol]{@link https://charles-tognol.fr}
     */
    add(task, callbacks) {
        if (HandleTodolist.isEmpty(task))
            callbacks.error("notWork", "la tâche est vide");
        else if (this.isInclude(task))
            callbacks.error("notWork", "la tâche existe déjà");
        else {
            this.todolist.push(task);
            callbacks.work.emit("todoList", this.todolist)
            // callbacks.work("todoList", this.todolist)
        }
    }

    /**
     * Suprime une tâche de la todolist après avoir effectue les verifications
     * Puis execute les fonctions callbacks
     *
     * @param task
     * @param {{'error': function, 'work': function}} callbacks de callbacks
     *
     *  @exemple
     *      delete('manger', {'error': function, 'work': function})
     *  @author Tognol Charles
     */
    delete(task, callbacks) {
        if(!HandleTodolist.isEmpty(task) && this.isInclude(task)) {
            this.todolist.splice(this.todolist.indexOf(task));
            callbacks.work("todolist", this.todolist)
        }else{
            callbacks.error('notwork', "La tâche est déjà suprimé")
        }
    }

    isInclude(task) {
        return this.todolist.includes(task)
    }

    static isEmpty(task) {
        return task === '' || task === undefined || task === null || task === 'undefined'
    }
    get show() {
        return this.todolist
    }
}

module.exports = HandleTodolist;