import PouchDB from 'pouchdb-browser';

const db = new PouchDB('PouchDB_TODO');


export const addTodoToDb = (todo) => {
    return db.put({
        _id: +new Date() + '',
        ...todo
    }).then( res => {
        console.log('add success');
        return res;
    })
};

export const deleteTodoFromDb = todo => {
    return db.remove(todo).then(res => {
        console.log('delete success');
        return res;
    });
};

export const updateTodoSyncDb = (todo) => {
    return db.put(todo);
};

export const getTodosFromDb = () => {
    return db.allDocs({include_docs: true, attachments: true});
};

export const getRawTodosFromDb = () => {
    return db.todo;
};


export const openDb = () => {
    return db.open();
};

export const closeDb = () => {
    console.log('db closed');
    return db.close();
};

export default db;

// may use plugin
//https://github.com/nolanlawson/relational-pouch
//https://github.com/nolanlawson/pouchdb-find
