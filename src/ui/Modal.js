import classes from './Modal.module.css';




function Modal(props) {
    



    return(
        <div className={classes.modal}>
            <h1>Change importance of the task</h1>
            <input type='radio' value={1} id='option1' name='importance' onChange={props.chooseImportance}/>
            <label htmlFor='option1'>Very important</label>
            <input type='radio' value={2} id='option2'name='importance'onChange={props.chooseImportance}/>
            <label htmlFor='option2'>Middle important</label>          
            <input type='radio' value={3} id='option3'name='importance' onChange={props.chooseImportance}/>
            <label htmlFor='option3'>Not very important</label>      
            <input type='radio' value={4} id='option4'name='importance' onChange={props.chooseImportance}/>
            <label htmlFor='option4'>Don't know yet</label>
        </div>
    )
}

export default Modal;

/* u inputu se musi nastavit name, jinak je chape jako kazdy zvlast a jde pak vybrat vsechny moznosti najendou.
kdyz nastavim stejny name, tak muzu pak vybrat pouze jednu moznost
*/