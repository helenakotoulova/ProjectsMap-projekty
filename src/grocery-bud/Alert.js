import classes from './Alert.module.css';

const Alert = ({danger,text}) => {
    return (<div className={`${classes.alert} ${danger? classes.danger: classes.noDanger}`}>
        {text}
    </div>)
}

export default Alert;