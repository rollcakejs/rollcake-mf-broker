import { UPDATE_STORE } from "../shared/constants";

function GlobalStore() {
    this._store = {};

    UPDATE_STORE.subscribe((response) => this._store = response);
}

GlobalStore.prototype.setStore = function(newStore) {
    this._store = newStore;
}

GlobalStore.prototype.getState = function(state) {
    return this._store[state];
};

GlobalStore.prototype.setState = function(state, value) {
    const newStore = {...this._store, [state]: value};
    UPDATE_STORE.next(newStore);
};

export default GlobalStore;