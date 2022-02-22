import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css';


const MainNavigation = ()=> {

    return (<header className={classes.header}>
        <nav className={classes.nav}>
            <img src='./images/logo.svg' alt='logo'/>
            <ul className={classes.list}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/cocktails'>Cocktails</Link>
                </li>
                <li>
                    <Link to='/about'>About Us</Link>
                </li>
            </ul>
        </nav>
    </header>)
}

export default MainNavigation;