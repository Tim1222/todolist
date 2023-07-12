import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {TaskPriotities, TaskStatuses} from "../api/todolists-api";

type ActionsTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistID: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy [action.todolistID] = filteredTasks

            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistID,
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low

            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistID] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = state[action.todolistID]
            state[action.todolistID] = tasks.map(t => t.id === action.taskId
                ? {...t, status: action.status}
                : t)

            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = state[action.todolistID]
            state[action.todolistID] = tasks.map(t => t.id === action.taskId
                ? {...t, title: action.title}
                : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskId}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}
export const changeTaskStatusAC = (taskId: string,
                                   status: TaskStatuses,
                                   todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistID, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistID, taskId}
}
