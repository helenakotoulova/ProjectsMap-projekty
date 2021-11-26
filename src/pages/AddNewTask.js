import NewTaskForm from "../Tasks/NewTaskForm";
import {useNavigate} from 'react-router-dom';

function AddNewTask() {
    const navigate=useNavigate();

    function addTaskData(data) {
        fetch('https://ukoly-d268c-default-rtdb.firebaseio.com/tasks.json',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-type': 'application/json'},
        }
        ).then(() => {navigate('/');});
    }


    return(
        <section>
            <h1>Add new task</h1>
            <NewTaskForm addTask={addTaskData}/>
        </section>
    )
}

export default AddNewTask;
