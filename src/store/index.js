import {Store} from 'vuex'
import Vuex from "vuex"
import Vue from "vue"
import allStore from './StoreFactory'

Vue.use(Vuex);
var store
if (!store) {
    store = new Store({
        modules: {
            ...allStore
        },
    });
}

export function getState (moduleName, v) {
    if (!store)
        return null
    try {
        return moduleName ? store.state[moduleName][v] : store.state[v]
    } catch (error) {
        console.error(error)
    }
}

export function setState (moduleName, field, v) {
    try {
        if (!store)
            return
        store.commit(`${moduleName ? `${moduleName}/` : ''}set${field[0].toLocaleUpperCase()}${field.substr(1)}`, v)
    } catch (error) {
        console.error(error)
    }
}

export default new Store({
    modules: {
        ...allStore
    },
});
