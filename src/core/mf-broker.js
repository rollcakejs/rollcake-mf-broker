import EventBus from "./event-bus";
import { WINDOW_VARIABLE, 
    CONTEXT_ATTRIBUTE, 
    STARTED_FETCH, FINISHED_FETCH, 
    INTERNAL_BUS_PUBLISH_EVENT_TYPE 
} from "../shared/constants";
import "./custom-elements";

function RollCakeMFBroker(props) {

    const { buckets, state } = props;
    
    this.context = {
        [CONTEXT_ATTRIBUTE.BUCKETS]: buckets,
        [CONTEXT_ATTRIBUTE.STATE]: state,
        [CONTEXT_ATTRIBUTE.BUS]: new EventBus()
    }

    //strictily internal
    this._fetchCount = 0;
}

RollCakeMFBroker.prototype.init = function() {
    window[WINDOW_VARIABLE.BROKER] = this.context;

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

RollCakeMFBroker.prototype.bus = function() {
    return this.context[CONTEXT_ATTRIBUTE.BUS];
}

RollCakeMFBroker.prototype.state = function() {
    return this.context[CONTEXT_ATTRIBUTE.STATE];
}

export default RollCakeMFBroker;