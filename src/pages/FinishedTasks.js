import React, { useContext } from 'react';
import { FinishedContext } from '../context/FinishedContext';
import TasksList from '../Tasks/TasksList';


function FinishedTasks() {

    //const dummyId=parseInt(useContext(IdContext));
    //const content = (dummyId !== -1)? (dummyData[dummyId-1].title): ("no finished tasks");

    const finishedContext=useContext(FinishedContext);
    const content = <TasksList tasks={finishedContext.finished} />;

    return(
        <section>
            <h1>Finished Tasks</h1>
            <p>{content}</p>
        </section>
    )
}

export default FinishedTasks;
