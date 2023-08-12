import { Text } from "react-native";
import moment from "moment-timezone";

export function getFormattedDate(date) { 
   return date.toISOString().slice(0,10);
}


export function getdateMinusdays(date,days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export function momentTime(date1){
    const timezone = 'Asia/Dhaka';

    // Create a new date object with the current time
    //const date1 = new Date();
    
    // Convert the date to the desired timezone and format it as a string
    const formattedDate = moment(date1).tz(timezone).format('YYYY-MM-DD');
    console.log(formattedDate + 'moment');
    return formattedDate;
     // Example output: 2023-03-16 12:35:10
}