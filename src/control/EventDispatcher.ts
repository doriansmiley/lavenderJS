/**
 * Created by dsmiley on 5/11/17.
 */
import {IEvent} from '../events/IEvent';
import {IEventDispatcher} from './IEventDispatcher'

class Listener {
    readonly handler:string;
    readonly instance:Object;

    constructor(handler:string, instance:Object) {
        this.handler = handler;
        this.instance = instance;
    }
}

export class EventDispatcher implements IEventDispatcher {
    public handlersByEventName:Object;

    constructor() {
        this.handlersByEventName = {};
    };

    public addEventListener(event:string, instance:Object, handler:string):void {
        if (this.handlersByEventName[event] === null || this.handlersByEventName[event] === undefined) {
            this.handlersByEventName[event] = [] as Array<Listener>;
        }
        this.handlersByEventName[event].push(new Listener(handler, instance));
    }

    public canListen(eventType:string, instance:Object, handler:string):boolean {
        let canListen = false;
        if (this.handlersByEventName[eventType] !== null && this.handlersByEventName[eventType] !== undefined) {
            for (let handlerIndex = 0; handlerIndex < this.handlersByEventName[eventType].length; handlerIndex++) {
                let handlerFunctionName = this.handlersByEventName[eventType][handlerIndex].handler;
                let objectInstance = this.handlersByEventName[eventType][handlerIndex].instance;
                if (handlerFunctionName == handler && objectInstance == instance) {
                    canListen = true;
                    break;
                }
            }
        }
        return canListen;
    }

    public removeEventListener(event:string, instance:Object, handler:string):void {
        if (this.handlersByEventName[event] === null || this.handlersByEventName[event] === undefined) {
            return;
        }
        for (let handlerIndex = 0; handlerIndex < this.handlersByEventName[event].length; handlerIndex++) {
            if (this.handlersByEventName[event][handlerIndex].instance == instance && this.handlersByEventName[event][handlerIndex].handler == handler) {
                let itemToRemove = this.handlersByEventName[event][handlerIndex];
                switch (handlerIndex) {
                    case 0:
                        this.handlersByEventName[event].shift();
                        break;
                    case this.handlersByEventName[event].length - 1:
                        this.handlersByEventName[event].pop();
                        break;
                    default:
                        let head = this.handlersByEventName[event].slice(0, handlerIndex);
                        let tail = this.handlersByEventName[event].slice(handlerIndex + 1);
                        this.handlersByEventName[event] = head.concat(tail);
                        break;
                }
                //there can be only one item matching event, instance, handler so we return here
                return itemToRemove;
            }
        }
    }

    public removeAllEventListeners(instance:Object):void {
        for (let event in this.handlersByEventName) {
            for (let handlerIndex = this.handlersByEventName[event].length - 1; handlerIndex >= 0; handlerIndex--) {
                if (this.handlersByEventName[event][handlerIndex].instance == instance) {
                    this.removeEventListener(event, instance, this.handlersByEventName[event][handlerIndex].handler);
                }
            }
        }
    }

    public dispatch(event:IEvent):void {
        if (this.handlersByEventName[event.type] === null || this.handlersByEventName[event.type] === undefined) {
            return;
        }
        // We need to make a copy of event handles before dispatching.
        // If the handler removes itself from the event queue during dispatching, it triggers removeEventListener, which
        // changes the array and this messes up the entire dispatch process (some handlers are never called).
        let dispatchToList = this.handlersByEventName[event.type].slice();
        let len = dispatchToList.length;
        for (let handlerIndex = 0; handlerIndex < len; ++handlerIndex) {
            let handlerFunctionName = (dispatchToList[handlerIndex] as Listener).handler;
            let instance = dispatchToList[handlerIndex].instance;
            instance[handlerFunctionName](event);
        }
    }
}