import TasksItems from "./TasksItems";
import classes from "./TasksLists.module.css";

function TasksList(props) {
    return(
        <ul className={classes.ul}>
            {props.tasks.map((task) => (
                <TasksItems 
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                />
            ))}
        </ul>
    )
}

export default TasksList;