import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

type ActionsTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const cnageTodoList = state.find(tl => tl.id === action.id)
            if (cnageTodoList) {
                cnageTodoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}


export const fetchTodolistsTC = (): any => {
    return async (dispatch: Dispatch) => {

        todolistsApi.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const removeTodolistTC = (todolistID: string): any => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTodolists(todolistID)
            .then((res) => {
                dispatch(removeTodolistAC(todolistID))
            })
    }
}

export const addTodolistTC = (title: string): any => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTodolists(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string): any => {
    return (dispatch: Dispatch) => {
        todolistsApi.updateTodolists(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}

