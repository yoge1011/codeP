import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./TestConstant"
import { asyncActionFinish } from "../async/asyncActions"
import { ASYNC_ACTION_START } from "../async/asyncConstant"

export const incrementCounter = () => {
    return{
        type: INCREMENT_COUNTER
    }
}

export const decrementCounter = () => {
    return{
        type: DECREMENT_COUNTER
    }
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const incrementAsync = (elementName) => {
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: elementName})
        await delay(1000)
        dispatch({type: INCREMENT_COUNTER})
        dispatch( asyncActionFinish() )
    }
}

export const decrementAsync = (elementName) => {
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: elementName})
        await delay(1000)
        dispatch({type: DECREMENT_COUNTER})
        dispatch( asyncActionFinish() )
    }
}