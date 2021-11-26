import { useRef } from 'react'; 
import classes from './NewTaskForm.module.css';
import Card from '../ui/Card';

function NewTaskForm(props) {
    const titleInputRef =useRef();
    const taskDescription = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const enteredTitle=titleInputRef.current.value;
        const enteredDescription=taskDescription.current.value;
        const data={
            title: enteredTitle,
            description: enteredDescription,
        };

        props.addTask(data);
    }

    return(
        <Card>
            <form onSubmit={submitHandler}>
                <div className={classes.formPart}>
                    <label htmlFor='taskTitle'>Task name</label>
                    <input type='text' id='taskTitle' ref={titleInputRef} required/>
                </div>
                <div className={classes.formPart}>
                    <label htmlFor='taskDescription'>Description</label>
                    <textarea rows='5' id='taskDescription' ref={taskDescription} required />
                </div>
                <div className={classes.actions}>
                    <button>Submit</button>
                </div>
            </form>
        </Card>
    )
}

export default NewTaskForm;