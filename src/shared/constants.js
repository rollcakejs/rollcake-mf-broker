import { Subject } from "rxjs";

//enums
export const WINDOW_VARIABLE = {
    ROLLCAKE: 'RollCake'
};
export const LOCAL_STORAGE = {
    GLOBAL_STORE: 'persist:rollcake'
};
export const CONTEXT_ATTRIBUTE = {
    BUCKETS: 'buckets',
    STORE: 'store',
    BUS: 'bus'
};
export const CUSTOM_ELEMENT_TAG = {
    MICROFRONTEND: 'rollcake-microfrontend'
};
export const INTERNAL_BUS_PUBLISH_EVENT_TYPE = {
    IS_FETCHING_MICROFRONTEND: 'e6ab1c83e197d65d087331223c7b5f9b',
    IS_STORE_UPDATED: 'acef7d28f9a17939357f1539b9f18e82'
};

//strictily internal
export const STARTED_FETCH = new Subject();
export const FINISHED_FETCH = new Subject();
export const UPDATE_STORE = new Subject();