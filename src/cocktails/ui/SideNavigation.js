import { Link } from "react-router-dom";
import classes from "./SideNavigation.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Fragment } from "react";

const SideNavigation = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      {!toggle && (
        <AiOutlineMenu
          className={classes.iconMenu}
          onClick={() => setToggle(true)}
        />
      )}
      {toggle && (
        <aside className={classes.header}>
          <nav className={classes.nav}>
            <div className={classes.intro}>
              <h3>Cocktails DB</h3>
              <button onClick={() => setToggle(false)} >
                <AiOutlineClose /> 
              </button>
            </div>
            <ul className={classes.list}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cocktails">Cocktails</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </Fragment>
  );
};

export default SideNavigation;
