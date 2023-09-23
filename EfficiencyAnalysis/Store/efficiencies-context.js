import { createContext, useReducer } from "react";

export const EfficienciesContext = createContext({
    efficiencies: [],
    addEfficiency: ({date,lineNumber,id,buyerName,daysRun,SO,styleName,itemName,SMV,manpower,hourTNC,hourMinusTNC,target10,production,without,due,rejection,remarks}) => {},
    setEfficiency: (efficiencies) => {},
    deleteEfficiency: (id) => {},
    updateEfficiency: (id,{date,lineNumber,buyerName,daysRun,SO,styleName,itemName,SMV,manpower,hour,hourTNC,hourMinusTNC,target10,production,without,due,rejection,remarks}) => {},})

function efficienciesReducer(state,action){
    switch (action.type) {
        case 'ADD':
            return [action.payload,...state];  
        case 'SET':
            const inverted= action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableEfficiencyIndex = state.findIndex(
                (efficiency) => efficiency.id === action.payload.id
            );
            const updatableEfficiency = state[updatableEfficiencyIndex];
            const updatedItem = {...updatableEfficiency,...action.payload.data};
            const updatedEfficiencies= [...state];
            updatedEfficiencies[updatableEfficiencyIndex] = updatedItem;
            return updatedEfficiencies;
        case 'DELETE':
            return state.filter((efficiency) => efficiency.id !== action.payload);                
        default:
            return state;
    }
}

function EfficienciesContextProvider ({children}){
 const [efficiencyState,dispatch] = useReducer(efficienciesReducer,[]);
   
    function addEfficiency(efficiencyData){
        dispatch({type:'ADD', payload: efficiencyData});
    }
    function setEfficiencies(efficiencies){
        dispatch({type:'SET', payload: efficiencies});
    }
    function deleteEfficiency(id){
        dispatch({type: 'DELETE' , payload : id});
    }
    function updateEfficiency(id, efficiencyData){
        dispatch({type:'UPDATE', payload:{id: id, data: efficiencyData}});
    }

    const value = {
        efficiencies: efficiencyState,
        addEfficiency: addEfficiency,
        setEfficiency: setEfficiencies,
        deleteEfficiency: deleteEfficiency,
        updateEfficiency: updateEfficiency,
    };

    return (
        <EfficienciesContext.Provider value={value}>
              {children}
        </EfficienciesContext.Provider>
    )
}

export default EfficienciesContextProvider;