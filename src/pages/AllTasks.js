import React from 'react';
import TasksList from '../Tasks/TasksList';


const dummyData = [
    {
        id: 1,
        title: 'Wash clothes',
        description: "Black and color"
    },
    {
        id: 2,
        title: 'Buy Christmas Gifts',
        description: 'Mom - cosmetics, dad - whisky'
    },
    {
        id:3,
        title: "Continue with Master's thesis",
        description: 'Start new CFD simulation'
    }
]



function AllTasks(props) {
    return(
        <section>
            <h1>All Tasks</h1>
            <p><TasksList tasks={dummyData} /></p>
        </section>    
    )
}

export default AllTasks;