import React, {useContext, useState, useEffect} from "react";
import classes from './TasksItems.module.css';
import { FinishedContext } from "../context/FinishedContext";
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Backdrop from "../ui/Backdrop";


function TasksItems(props) {
    const [pozadi,setPozadi]=useState('white');
    const [hodnota, setHodnota]=useState(0);

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

    const [modalIsOpen,setModalIsOpen] = useState(false);

    function clickHandler() {
        return(
            setModalIsOpen(true)
        )
    }

    function closeModalHandler() {
        return(
            setModalIsOpen(false)
        )
    }

    function chooseImportanceHandler(event) {
        setHodnota(event.target.value);
        setModalIsOpen(false);
    }

    useEffect(()=>{
        if (parseInt(hodnota) === 1 ) {
            setPozadi('#ffcccb');
        } else if (parseInt(hodnota) === 2 ) {
            setPozadi('lightyellow');
        } else if (parseInt(hodnota) === 3 ) {
            setPozadi('lightgreen');
        } else if (parseInt(hodnota) === 4 ) {
            setPozadi('white');
        }
    }, [hodnota])


    return(
            <li key={props.id}>
                <Card>
                    <div className={classes.ukoly} style={{backgroundColor: pozadi}}>
                        <div className={classes.actions} onClick={clickHandler}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            <h2 className={classes.title}>{props.title}</h2>
                            <p className={classes.description}>Description: {props.description}</p>
                            <button className={classes.toggleButton} key={props.id} id={props.id} onClick={toggleFinished}>{itemIsFinished? 'Remove from finished' : 'Add to finished'}</button>
                        </div>
                    </div>
                    <div>
                        {modalIsOpen && <Backdrop closeModal={closeModalHandler}/>}
                        {modalIsOpen && <Modal chooseImportance={chooseImportanceHandler}/>}
                    </div>
                </Card>
            </li>    
    )
}

export default TasksItems;
