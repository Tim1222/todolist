import React from "react";
import {Provider} from "react-redux";
import {AppRootState} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistReducer} from "../state/todolist-reducer";
import {v1} from "uuid";
import {TaskPriotities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState: AppRootState = {
    todolist: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ],
        ['todolistId2']:
            [
                {
                    id: v1(),
                    title: "JS",
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId2',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 2,
                    priority: TaskPriotities.Low
                },
                {
                    id: v1(),
                    title: "JS",
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId2',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 2,
                    priority: TaskPriotities.Low
                }
            ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)
export const ReduxStoreProviderDecorator = (storyFn: any) => (<Provider store={storyBookStore}> {storyFn()} </Provider>)
