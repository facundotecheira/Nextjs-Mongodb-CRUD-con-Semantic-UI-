import {Button,Card,CardContent,Container,Grid} from 'semantic-ui-react'
import { useRouter } from 'next/router'
export default function Home({tasks}) {

  const router = useRouter()

  if(tasks.length === 0){
    return(
      <Grid
      centered
      verticalAlign = 'middle'
      columns="1"
      style={{height: "80vh"}}>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h1>There are not found</h1>
            <img width={250} src='https://cast.blue/assets/img/no-data-found.png'
            alt='No task yet'/>
            <div>
              <Button primary onClick={()=>router.push('/tasks/new')}>Create a Task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    <Container style={{padding:'20px'}}>
      <Card.Group itemsPerRow={4}>
        {
          tasks.map(task =>(
            <Card key={task._id}>
              <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <p>{task.description}</p>
              </Card.Content>
              <CardContent extra> 
              <Button primary onClick={() =>router.push(`/tasks/${task._id}`)}>View</Button>
              <Button primary onClick={()=> router.push(`/tasks/${task._id}/edit`)}>Edit</Button>

              </CardContent>
            </Card>
          ))
        }
      </Card.Group>
    </Container>
  )
}


export const getServerSideProps = async (ctx) => {

  const res = await fetch('http://localhost:3000/api/tasks')
  const tasks = await res.json()
  
  return {
    props: {
      tasks,
    }, // will be passed to the page component as props
  }
}