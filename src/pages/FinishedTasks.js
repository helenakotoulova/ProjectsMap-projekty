import { useContext } from 'react';

function FinishedTasks() {
    const finishedCtx=useContext()

    return(
        <h1>Finished Tasks</h1>
    )
}

export default FinishedTasks;
