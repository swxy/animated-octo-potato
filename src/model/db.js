import Dexie from 'dexie';

let db = new Dexie('TestTodo');

db.version(0.1).stores({todo: '++id'});
db.open().catch (function (err) {
    console.error('Failed to open db: ' + (err.stack || err));
});

export const addTodoToDb = (todo) => {
    return db.todo.put({
        ...todo
    }).then( res => {
        console.log('add success');
        return res;
    })
};

export const deleteTodoFromDb = id => {
    return db.todo.where('id').equals(id).delete().then(res => {
        console.log('delete success');
        return res;
    });
};

export const updateTodoSyncDb = (id, todo) => {
    if (!id) {
        throw Error('required id');
    }
    return db.todo.update(id, {...todo});
};

export const getTodosFromDb = () => {
    return db.todo.toArray();
};


export const openDb = () => {
    return db.open();
};

export const closeDb = () => {
    return db.close();
};

export default db;

