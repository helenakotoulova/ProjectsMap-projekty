import React, {useContext} from "react";
import classes from './TasksItems.module.css';
import { FinishedContext } from "../context/FinishedContext";



function TasksItems(props) {
    const finishedProv=useContext(FinishedContext);
    const itemIsFinished=finishedProv.itemIsFinished(props.id);

    function toggleFinished() {
        if (itemIsFinished) {
            finishedProv.removeFinished(props.id);
        } else {
            finishedProv.addFinished({
                id: props.id,
                title: props.title,
                description: props.description,
              })
        }
    }

    return(
            <li key={props.id}>
                <div className={classes.ukoly}>
                    <h2 className={classes.title}>{props.title}</h2>
                    <p className={classes.description}>Description: {props.description}</p>
                    <button key={props.id} id={props.id} onClick={toggleFinished}>{itemIsFinished? 'Remove from finished' : 'Add to finished'}</button>
                </div>
            </li>    
    )
}

export default TasksItems;
