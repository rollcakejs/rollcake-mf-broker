import GlobalStore from "./global-store";
import EventBus from "./event-bus";
import { WINDOW_VARIABLE, 
    CONTEXT_ATTRIBUTE, 
    STARTED_FETCH, FINISHED_FETCH, 
    INTERNAL_BUS_PUBLISH_EVENT_TYPE, 
    LOCAL_STORAGE,
    UPDATE_STORE
} from "../shared/constants";
import "./custom-elements";

function RollCakeMFBroker(buckets) {
    this.context = {
        [CONTEXT_ATTRIBUTE.BUCKETS]: buckets,
        [CONTEXT_ATTRIBUTE.STORE]: new GlobalStore(),
        [CONTEXT_ATTRIBUTE.BUS]: new EventBus()
    };

    //strictily internal
    this._fetchCount = 0;
}

RollCakeMFBroker.prototype.init = function() {
    window[WINDOW_VARIABLE.ROLLCAKE] = this.context;

    //watch update of store
    UPDATE_STORE.subscribe((newGlobalStore) => {
        window.localStorage.setItem(LOCAL_STORAGE.GLOBAL_STORE, JSON.stringify(newGlobalStore));
        this.context[CONTEXT_ATTRIBUTE.BUS].publish(INTERNAL_BUS_PUBLISH_EVENT_TYPE.IS_STORE_UPDATED);
    });

    //watch micro frontends fetch
    STARTED_FETCH.subscribe(() => {
        this._fetchCount += 1;
        this.context[CONTEXT_ATTRIBUTE.BUS].publish(INTERNAL_BUS_PUBLISH_EVENT_TYPE.IS_FETCHING_MICFRONTEND, true);
    });
    FINISHED_FETCH.subscribe(() => {
        this._fetchCount -= 1;
        if (this._fetchCount > 0) {
            this.context[CONTEXT_ATTRIBUTE.BUS].publish(INTERNAL_BUS_PUBLISH_EVENT_TYPE.IS_FETCHING_MICFRONTEND, true);
        }
        else {
            this.context[CONTEXT_ATTRIBUTE.BUS].publish(INTERNAL_BUS_PUBLISH_EVENT_TYPE.IS_FETCHING_MICFRONTEND, false);
        }
    });
};

RollCakeMFBroker.prototype.getBuckets = function() {
    return this.context[CONTEXT_ATTRIBUTE.BUCKETS];
}

RollCakeMFBroker.prototype.getBus = function() {
    return this.context[CONTEXT_ATTRIBUTE.BUS];
}

RollCakeMFBroker.prototype.getStore = function() {
    return this.context[CONTEXT_ATTRIBUTE.STORE];
}

export default RollCakeMFBroker;