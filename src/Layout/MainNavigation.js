import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {useContext} from 'react';
import { FinishedContext } from "../context/FinishedContext";

function MainNavigation() {
    const tasksContext=useContext(FinishedContext);
    const totalFinished=tasksContext.totalFinished;
    return(
        <header className={classes.header}>
            <div className={classes.logo}>My tasks</div>
            <nav>
                <ul>
                    <li><Link to="/">All Tasks</Link></li>
                    <li><Link to='/add-new-task'>Add new task</Link></li>
                    <li><Link to='/finished-tasks'>Finished Tasks</Link></li>
                    <span className={classes.badge}>{totalFinished}</span>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;