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

export const buldAddTodosToDb = (todos) => {
    if (Array.isArray(todos)) {
        const id = +new Date();
        todos.map((todo, idx) => {
            todo._id = id + idx + '';
        });
        return db.bulkDocs(todos).then(res => {
            console.log('bulk add todos success');
            return res;
        });
    }
    else {
        throw new Error('todos must be array');
    }
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

export const getTagsFromDb = () => {
    let todoMap = (doc) => {
        emit(doc.tags);
    };
    let todoReduce = (keys) => {
        let tags = [];
        for (let item of keys) {
            tags = tags.concat(item[0])
        }
        return Array.from(new Set(tags));
    };
    return db.query({
        map: todoMap,
        reduce: todoReduce
    }, {
        reduce: true
    }).then((result) => {
        return result.rows[0].value || [];
    }).catch((err) => {
        console.error(err);
    })
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
