import React from 'react';
import TasksList from '../Tasks/TasksList';
import { useState, useEffect } from 'react';

/*
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
*/

function AllTasks(props) {

    const [loadedTasks, setLoadedTasks]=useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        setIsLoading(true);
        fetch('https://ukoly-d268c-default-rtdb.firebaseio.com/tasks.json'
        ).then((response)=>{return response.json();
        }).then((mojeData) => {
            const myTasks=[];
            for (const key in mojeData) {
                const task = {
                    id: key,
                    ...mojeData[key],
                };
            myTasks.push(task);
            }
        setLoadedTasks(myTasks);
        setIsLoading(false);
    });
    }, []);
    
    if (isLoading) {
        return(
            <p>Loading...</p>
        )
    }


    return(
        <section>
            <h1>All Tasks</h1>
            <TasksList tasks={loadedTasks} />         
        </section>    
    )
}

export default AllTasks;