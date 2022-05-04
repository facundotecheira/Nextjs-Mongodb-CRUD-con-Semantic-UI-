import { Form, Grid, Button, Confirm } from "semantic-ui-react"
import { useState,useEffect } from 'react'
import { useRouter } from "next/router"



export default function NewTaskPage() {

    const {query:{id},push} = useRouter()

    

    const [newTask, setNewTask] = useState({
        title: '',
        description: ''
    })

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    })

    const validate = () => {
        const errors = {}
        if (!newTask.title) errors.title = 'Title is required'
        if (!newTask.description) errors.description = 'Description is required'

        return errors
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        let errors = validate()

        if (Object.keys(errors).length) {
            setErrors(errors)
        } else{
            setErrors([])
            id ? await updateTask() : await createTask() 
            await push('/')
        }
        
    }




    const updateTask = async () =>{
        try {
            try {
                await fetch(`http://localhost:3000/api/tasks/${id}`,{
                    method:'PUT',
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newTask)
                })
            } catch (error) {
                
                console.log(error)
            }
        } catch (error) {
            
        }
    }

    const createTask = async () =>{
        try {
            await fetch('http://localhost:3000/api/tasks',{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            
            console.log(error)
        }
    }

    const handlerChange = (e) =>
        setNewTask({ ...newTask, [e.target.name]: e.target.value })

    const getTask = async () =>{
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${id}`)
            const data = await res.json()
            setNewTask({title:data.title,description:data.description})
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if (id) getTask()
    },[])
    
    return (
        <Grid
            centered
            verticalAlign='middle'
            columns="3"
            style={{ height: "80vh" }}>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <h1> {id ? 'Updating Task': 'Create a Task'}</h1>
                    <Form onSubmit={handlerSubmit}>
                        <Form.Input
                            label='Title'
                            palceholder='title'
                            name='title'
                            onChange={handlerChange}
                            error={
                                errors.title ?
                                    { content: errors.title,pointing: 'below' } :
                                    null
                            }
                            value={newTask.title} />
                        <Form.TextArea
                            label='Description'
                            palceholder='Description'
                            name='description'
                            onChange={handlerChange}
                            error={
                                errors.description ?
                                    { content: errors.description,pointing: 'below' } :
                                    null
                            }
                            value={newTask.description} />
                        <Button primary>{id? 'Update':'Save'}</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
            
        </Grid>
    )
}

