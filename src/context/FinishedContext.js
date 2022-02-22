import React, { useState, createContext } from 'react';


export const FinishedContext = createContext({
    finished: [],
    totalFinished: 0,
    addFinished: {},
    removeFinished:{},
    itemIsFinished: {},
}
);

function FinishedProvider(props) {

    const [finished,setFinished] = useState([]);

    function addfinishedHandler(clicked) {
        setFinished((prevClicked) => { return prevClicked.concat(clicked)})            
    }
    
    function removefinishedHandler(clicked) {
        return(
       // setFinished(finished.filter(element => element.id !== clicked))
       setFinished((prev) => {return prev.filter(element => element.id !== clicked)}
        )
        )
    }

    // jak to pak hodim do tech TasksItems, tak to clicked bude vlastne props.id
    
    function itemIsFinishedHandler(clicked) {
        return(
            finished.some(element => element.id === clicked)
        )
    }


    const context = {
        finished: finished,
        totalFinished: finished.length,
        addFinished: addfinishedHandler,
        removeFinished: removefinishedHandler,
        itemIsFinished: itemIsFinishedHandler,
    }

return (
    <FinishedContext.Provider value={context}>
        {props.children}
    </FinishedContext.Provider>
)
}

export default FinishedProvider;