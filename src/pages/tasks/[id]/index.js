import Error from "next/error"
import { Grid, Button,Confirm,Loader } from "semantic-ui-react"
import {useState} from 'react'
import { useRouter } from "next/router"

export default function TaskDetail({ task, error }) {

    const {query:{id}, push} = useRouter()
    
    const [confirm, setConfirm] = useState(false)
    const [loading,setLoading] = useState(false)

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)
    
    const deleteTask = async () =>{
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`,{
                method:'DELETE'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = () =>{
        setLoading(true)
        deleteTask()
        close()
 
        push('/')
    }

    if (error && error.statusCode)
        return <Error statusCode={error.statusCode}
            title={error.statusMessage} />
    return (
        <Grid
            centered
            verticalAlign='middle'
            columns="1"
            style={{ height: "80vh" }}>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <div>
                        <Button
                            color="red"
                            onClick={open}
                            loading={loading}>
                            Delete
                        </Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Confirm
            header = 'Please Confirm'
            content = 'Are you sure you want to delete this task '
            open={confirm}
            onCancel={close}
            onConfirm={handleDelete}
            />
        </Grid>
    )
}

export async function getServerSideProps({ query: { id } }) {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`)

    if (res.status === 200) {

        const task = await res.json()
        return {
            props: {
                task
            }
        }
    }
    
    return {

        props: {
            error: {
                statusCode: res.status,
                statusMessage: "Invalid id"
            },
        }
    }
}

