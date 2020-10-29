import { LOCAL_STORAGE, UPDATE_STORE } from "../shared/constants";

function GlobalStore() {}

GlobalStore.prototype.getState = function(state) {
    const currGlobalState = window.localStorage.getItem(LOCAL_STORAGE.GLOBAL_STORE);
    if (currGlobalState) {
        return JSON.parse(currGlobalState)[state];
    }
    return null;
};

GlobalStore.prototype.setState = function(state, value) {
    const currGlobalState = window.localStorage.getItem(LOCAL_STORAGE.GLOBAL_STORE) 
    ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.GLOBAL_STORE)) : {};
    const newGlobalState = {...currGlobalState, [state]: value};
    UPDATE_STORE.next(newGlobalState);
};

export default GlobalStore;