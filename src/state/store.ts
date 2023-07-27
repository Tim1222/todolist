import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,
    applyMiddleware(thunk)
)

export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch

// @ts-ignore
window.store = store