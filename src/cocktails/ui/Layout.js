import MainNavigation from "./MainNavigation";
import classes from './Layout.module.css';
//import SideNavigation from "./SideNavigation";

const Layout = ({children}) => {
  return (
    <section className={classes.layout}>
      <MainNavigation />
      {children}
      <footer className={classes.footer}>© Our cocktails, 2022</footer>
    </section>
  );
};

export default Layout;
