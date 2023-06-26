import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: "Task Component",
    component: Task
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const changeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'CSS'}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={changeTaskCallback}
            todolistId={'todolistID1'}
        />
        <Task
            task={{id: '2', isDone: false, title: 'JS'}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={changeTaskCallback}
            todolistId={'todolistID1'}
        />
    </>
}