const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findActions,
    add,
    addAction,
    update,
    remove,
}

function find(){
    return db('projects');

}

function findById(id){
    return db('projects')
    .first()
    .where('projects.id',id)
    .innerJoin('actions','projects.id','actions.project_id');
}

function findActions(id){
    return db('actions').where({project_id:id})
}

function add(project){
    return db('projects')
        .insert(project)
        .then(ids => {
            return findById(ids[0]);
        })
}

function addAction(action,id){
    return db('actions')
        .insert(action)
        .where({project_id:id})
        .then(ids => {
            return findById(ids[0]);
        })
}

function update(changes, id){
    return db('projects')
    .where({ id })
    .update(changes);
}

function remove(id){
    return db('projects')
    .where('id', id)
    .del();
}