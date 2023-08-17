import { createContext, useReducer } from "react";

export const PermissionsContext = createContext({
    permissions: [],
    addPermission: ({date,lineNumber,id,buyerName,daysRun,SO,styleName,itemName,SMV,manpower,hour,target10,production,without,due,rejection,remarks}) => {},
    setPermission: (permissions) => {},
    deletePermission: (id) => {},
    updatePermission: (id,{date,lineNumber,buyerName,daysRun,SO,styleName,itemName,SMV,manpower,hour,target10,production,without,due,rejection,remarks}) => {},})

function permissionsReducer(state,action){
    switch (action.type) {
        case 'ADD':
            return [action.payload,...state];  
        case 'SET':
            const inverted= action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatablePermissionIndex = state.findIndex(
                (permission) => permission.id === action.payload.id
            );
            const updatablePermission = state[updatablePermissionIndex];
            const updatedItem = {...updatablePermission,...action.payload.data};
            const updatedPermissions= [...state];
            updatedPermissions[updatablePermissionIndex] = updatedItem;
            return updatedPermissions;
        case 'DELETE':
            return state.filter((permission) => permission.id !== action.payload);                
        default:
            return state;
    }
}

function PermissionsContextProvider ({children}){
 const [permissionState,dispatch] = useReducer(permissionsReducer,[]);
   
    function addPermission(permissionData){
        dispatch({type:'ADD', payload: permissionData});
    }
    function setPermissions(permissions){
        dispatch({type:'SET', payload: permissions});
    }
    function deletePermission(id){
        dispatch({type: 'DELETE' , payload : id});
    }
    function updatePermission(id, permissionData){
        dispatch({type:'UPDATE', payload:{id: id, data: permissionData}});
    }

    const value = {
        permissions: permissionState,
        addPermission: addPermission,
        setPermission: setPermissions,
        deletePermission: deletePermission,
        updatePermission: updatePermission,
    };

    return (
        <PermissionsContext.Provider value={value}>
              {children}
        </PermissionsContext.Provider>
    )
}

export default PermissionsContextProvider;