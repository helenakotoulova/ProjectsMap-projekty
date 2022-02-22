import React from "react";
import classes from './TodosItems.module.css';


const TodosItems:React.FC<{text:string; onRemoveItem: ()=> void}> = ({text,onRemoveItem}) => {
    return(
            <li className={classes.item} onClick={onRemoveItem}>{text}</li>
          )}

export default TodosItems;
