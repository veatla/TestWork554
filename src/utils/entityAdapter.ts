type AnyObject = {
    [x: string]: unknown;
}
export interface Entities<T extends AnyObject, Id extends string> {
    ids: Array<string>;
    entities: {
        [key: string]: T,
    };
    key: Id;
}

export default class EntityAdapter {
    static create<T extends AnyObject, Id extends string>(initialState: Array<T>, id: Id) {
        const store: Entities<T, Id> = { entities: <Record<Id, T>>{}, ids: [], key: id };

        if (initialState.length) EntityAdapter.add_many(store, initialState);

        return store;
    }

    static add_many<T extends AnyObject, Id extends string>(store: Entities<T, Id>, items: Array<T>) {
        this.add_array(store, items);
    }

    static add_array<T extends AnyObject, Id extends string>(store: Entities<T, Id>, items: Array<T>) {
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            this.add(store, element);
        }
    }

    static add<T extends AnyObject, Id extends string>(store: Entities<T, Id>, item: T) {
        const id = <string>item[store.key];
        store.ids.push(id);
        store.entities[id] = item;
    }

    static delete<T extends AnyObject, Id extends string>(store: Entities<T, Id>, item: Id) {
        store.ids = store.ids.filter((v) => v !== item);
        delete store.entities[item];
    }
    static delete_all<T extends AnyObject, Id extends string>(store: Entities<T, Id>) {
        store.ids = [];
        store.entities = <Record<Id, T>>{};
    }

    static upsert<T extends AnyObject, Id extends string>(store: Entities<T, Id>, item: T) {
        const id = <string>item[store.key];
        const index = store.ids.findIndex((v) => v === id);
        if (index === -1) store.ids.push(id);
        if (store.entities[id]) this.update(store, item); 
        else store.entities[id] = item;
    }

    static update<T extends AnyObject, Id extends string>(store: Entities<T, Id>, item: T) {
        const id = <string>item[store.key];
        const obj = store.entities[id];
        store.entities[id] = {
            ...obj,
            item,
        };
    }

    // protected add_map<T extends AnyObject, Id extends string>(store: Entities<T, Id>, items: Record<Id, T>) {
    //     for (const _key in items) {
    //         const key = <Id>_key;

    //         const element = items[key];
    //         const id = <Id>element[store.key];

    //         store.ids.push(id);
    //         store.entities[id] = element;
    //     }
    // }
}
