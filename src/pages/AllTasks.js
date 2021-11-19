import React from 'react';
import classes from './AllTasks.module.css'

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
    //const data={title: 'cau'}
    //console.log(dummyData[0].title)

function AllTasks(props) {
    return(
        <section>
            <h1>All Tasks</h1>
            {dummyData.map((x) => 
                <div className={classes.ukoly}>
                <h2 className={classes.title}>{x.title}</h2>
                <p className={classes.description}>Description: {x.description}</p>
                <button>Finished</button>
                <button>Abort</button>
                </div>)}   
        </section>
    )
}

export default AllTasks;