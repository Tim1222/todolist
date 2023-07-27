import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType, todolistsApi} from "./api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useAppDispatch()
    const todoList = useSelector<AppRootState, Array<TodolistDomainType>>((state => state.todolist))
    const tasks = useSelector<AppRootState, TasksStateType>((state => state.tasks))

    // console.log( todolistsApi.getTodolists())
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistID: string) {
        dispatch(removeTaskAC(id, todolistID))
    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistID: string) {
        dispatch(addTaskAC(title, todolistID))
    }, [dispatch])

    const changeStatus = useCallback(function (taskID: string, status: TaskStatuses, todolistID: string) {
        dispatch(changeTaskStatusAC(taskID, status, todolistID))
    }, [dispatch])

    const changeTaskTitle = useCallback(function (taskID: string, newTitle: string, todolistID: string) {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistID))
    }, [dispatch])

    const changeFilter = useCallback(function (value: FilterValuesType, todoListID: string) {
        const action = changeTodolistFilterAC(todoListID, value)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback(function (todolistID: string) {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback(function (todoListID: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todoListID, newTitle))
    }, [dispatch])


    const addTodolists = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">

            <AppBar position="static">

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px 5px 20px'}}>
                    <AddItemForm addItem={addTodolists}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todoList.map((tl) => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks

                            return <Grid item>
                                <Paper style={{padding: '15px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;