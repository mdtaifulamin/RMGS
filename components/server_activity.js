import axios from "axios";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { fireStoreDb } from "../lib/firebase"

const day = new Date()
let enteredDate = day.toLocaleDateString()
enteredDate = enteredDate.replace(/[/]/g,"-")
// console.log(enteredDate)

// const [error, setError] = useState()

// Applicable for V -- 1.0.0
// const main_server = 'https://firsttrial-cff1d-default-rtdb.firebaseio.com'

// export function store_line_data(complete_data){
//     axios.post(main_server + '/HourlyProductionData.json',
//     complete_data)
//     console.log('data imported')
// }
////////////////////////////////////////////////////////////////////////////


const production_server = 'https://firsttrial-cff1d-default-rtdb.firebaseio.com/hourlyProductionData_v_200'
const machine_server = 'https://firsttrial-cff1d-default-rtdb.firebaseio.com/machineDataBase_v_200'
const capacity_server = 'https://firsttrial-cff1d-default-rtdb.firebaseio.com/capacityDatabase_v_201'


// Applicable for V -- 1.5.0
// export function store_line_data(complete_data, enteredDate, enteredLine, enteredWH){
//     const date_child = main_server + "/" + enteredDate;
//     const line_child = date_child + "/" + "line_" +enteredLine;
//     const hour_child = line_child + "/" + "hour_" + enteredWH + ".json";

//     axios.patch(hour_child, complete_data
//     )
//     console.log('data imported')
// }

export async function store_line_data(enteredDate,line_no, hour, complete_data){
    for (const key in line_no){
        const individualLine = line_no[key].toString()
        const production_date_child = production_server + "/" + enteredDate + "/" +  individualLine + "/" + hour + ".json";
        try {
            await axios.patch(production_date_child, complete_data[key])
        } catch (error) {
            return error.message
        }
    }
    return 'success'
}

export async function store_line_machine(lineNo, machineDataSet){
    const machine_date_child = machine_server + "/" + lineNo + ".json";
    try {
        await axios.patch(machine_date_child, machineDataSet)
    } catch (error) {
        return error.message
    }
    return 'success'
}

// export async function store_capacity_data(totalCapacityData){
//     const capacity_data_child = capacity_server+ '/' + enteredDate +'.json';
//     console.log(capacity_data_child)
//     try {
//         await axios.patch(capacity_data_child, totalCapacityData)
//     } catch (error) {
//         return error.message
//     }
//     return 'success'
// }

export async function store_capacity_data(totalCapacityData) {
    const colRef = collection(fireStoreDb,"capacity-2.0");
    try {
        await addDoc(colRef, totalCapacityData);
    } catch (error) {
        return error.message
    }
    return 'success'
}
