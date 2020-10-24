import { Subject } from "rxjs";

//enums
export const WINDOW_VARIABLE = {
    BROKER: 'RollCakeBrokerSharedVariables'
};
export const CONTEXT_ATTRIBUTE = {
    BUCKETS: 'buckets',
    STATE: 'state',
    BUS: 'bus'
};
export const CUSTOM_ELEMENT_TAG = {
    MICROFRONTEND: 'rollcake-microfrontend'
};
export const INTERNAL_BUS_PUBLISH_EVENT_TYPE = {
    IS_FETCHING_MICFRONTEND: 'NsCqex',
};

//subjects
export const STARTED_FETCH = new Subject();
export const FINISHED_FETCH = new Subject();