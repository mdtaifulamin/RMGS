import { createContext, useReducer } from "react";

export const OverTimesContext = createContext({
    overTimes: [],
    addOverTime: ({date,lineNumber,manpower, id,twoHourOT, fourHourOT, sixHourOT,Main_TNC, TNC_2,TNC_4,TNC_6,remarks}) => {},
    setOverTime: (overTimes) => {},
    deleteOverTime: (id) => {},
    updateOverTime: (id,{date,lineNumber,manpower, twoHourOT, fourHourOT, sixHourOT,Main_TNC, TNC_2,TNC_4,TNC_6,remarks}) => {},})

function overTimesReducer(state,action){
    switch (action.type) {
        case 'ADD':
            return [action.payload,...state];  
        case 'SET':
            const inverted= action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableOverTimeIndex = state.findIndex(
                (overTime) => overTime.id === action.payload.id
            );
            const updatableOverTime = state[updatableOverTimeIndex];
            const updatedItem = {...updatableOverTime,...action.payload.data};
            const updatedOverTimes= [...state];
            updatedOverTimes[updatableOverTimeIndex] = updatedItem;
            return updatedOverTimes;
        case 'DELETE':
            return state.filter((overTime) => overTime.id !== action.payload);                
        default:
            return state;
    }
}

function OverTimesContextProvider ({children}){
 const [overTimeState,dispatch] = useReducer(overTimesReducer,[]);
   
    function addOverTime(overTimeData){
        dispatch({type:'ADD', payload: overTimeData});
    }
    function setOverTimes(overTimes){
        dispatch({type:'SET', payload: overTimes});
    }
    function deleteOverTime(id){
        dispatch({type: 'DELETE' , payload : id});
    }
    function updateOverTime(id, overTimeData){
        dispatch({type:'UPDATE', payload:{id: id, data: overTimeData}});
    }

    const value = {
        overTimes: overTimeState,
        addOverTime: addOverTime,
        setOverTime: setOverTimes,
        deleteOverTime: deleteOverTime,
        updateOverTime: updateOverTime,
    };

    return (
        <OverTimesContext.Provider value={value}>
              {children}
        </OverTimesContext.Provider>
    )
}

export default OverTimesContextProvider;