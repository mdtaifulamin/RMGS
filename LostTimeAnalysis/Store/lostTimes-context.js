import { createContext, useReducer } from "react";

export const LostTimesContext = createContext({
    lostTimes: [],
    addLostTime: ({date,lineNumber,id,buyerName,daysRun,SO,styleName,itemName,SMV,manpower,hour,target10,production,without,due,rejection,remarks}) => {},
    setLostTime: (lostTimes) => {},
    deleteLostTime: (id) => {},
    updateLostTime: (id,{date,lineNumber,buyerName,daysRun,SO,styleName,itemName,SMV,manpower,hour,target10,production,without,due,rejection,remarks}) => {},})

function lostTimesReducer(state,action){
    switch (action.type) {
        case 'ADD':
            return [action.payload,...state];  
        case 'SET':
            const inverted= action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableLostTimeIndex = state.findIndex(
                (lostTime) => lostTime.id === action.payload.id
            );
            const updatableLostTime = state[updatableLostTimeIndex];
            const updatedItem = {...updatableLostTime,...action.payload.data};
            const updatedLostTimes= [...state];
            updatedLostTimes[updatableLostTimeIndex] = updatedItem;
            return updatedLostTimes;
        case 'DELETE':
            return state.filter((lostTime) => lostTime.id !== action.payload);                
        default:
            return state;
    }
}

function LostTimesContextProvider ({children}){
 const [lostTimeState,dispatch] = useReducer(lostTimesReducer,[]);
   
    function addLostTime(lostTimeData){
        dispatch({type:'ADD', payload: lostTimeData});
    }
    function setLostTimes(lostTimes){
        dispatch({type:'SET', payload: lostTimes});
    }
    function deleteLostTime(id){
        dispatch({type: 'DELETE' , payload : id});
    }
    function updateLostTime(id, lostTimeData){
        dispatch({type:'UPDATE', payload:{id: id, data: lostTimeData}});
    }

    const value = {
        lostTimes: lostTimeState,
        addLostTime: addLostTime,
        setLostTime: setLostTimes,
        deleteLostTime: deleteLostTime,
        updateLostTime: updateLostTime,
    };

    return (
        <LostTimesContext.Provider value={value}>
              {children}
        </LostTimesContext.Provider>
    )
}

export default LostTimesContextProvider;