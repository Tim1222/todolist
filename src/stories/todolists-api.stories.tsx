import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsApi.getTodolists()
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolists('haha')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '704229c2-3d74-43be-bf92-54c697eed3fc'
        todolistsApi.deleteTodolists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2b4a4569-fb51-4c63-b119-efe688c2fdfa'
        todolistsApi.updateTodolists(todolistId, 'YoYoYoYo')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '2b4a4569-fb51-4c63-b119-efe688c2fdfa'
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {

    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {

        const todolistId = '2b4a4569-fb51-4c63-b119-efe688c2fdfa'
        const taskId = ''
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistsId'} value={todolistId} onChange={ (e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId} onChange={ (e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}