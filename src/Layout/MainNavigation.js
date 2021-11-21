import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
    return(
        <header className={classes.header}>
            <div className={classes.logo}>My tasks</div>
            <nav>
                <ul>
                    <li><Link to="/">All Tasks</Link></li>
                    <li><Link to='/finished-tasks'>Finished Tasks</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;