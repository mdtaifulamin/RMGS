import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { BarChart } from "react-native-chart-kit";
import { ColorLibrary } from "../Style/color";

////////////////////////////// USING REACT NATIVE SVG V-9.13.3 ///////////////////////////////

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

/////////////////// For Scroll View Refresh ////////////////////////

// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "1-6", value: [1, 2, 3, 4, 5, 6] },
    // [1,2,3,4,5,6]
    { label: "7-15", value: [7, 8, 9, 10, 11, 12, 13, 14, 15] },
    { label: "16-21", value: [16, 17, 18, 19, 20, 21] },
    { label: "22-30", value: [22, 23, 24, 25, 26, 27, 28, 29, 30] },
    { label: "31-36", value: [31, 32, 33, 34, 35, 36] },
    { label: "37-45", value: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
    { label: "46-55", value: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55] },
    { label: "56-62", value: [56, 57, 58, 59, 60, 61, 62] },
    { label: "63-69", value: [63, 64, 65, 66, 67, 68, 69] },
    { label: "70-76", value: [70, 71, 72, 73, 74, 75, 76] },
    { label: "77-81", value: [77, 78, 79, 80, 81] },
    { label: "82-86", value: [82, 83, 84, 85, 86] },
    { label: "87-91", value: [87, 88, 89, 90, 91] },
    { label: "92-96", value: [92, 93, 94, 95, 96] },
    { label: "97-105", value: [97, 98, 99, 100, 101, 102, 103, 104, 105] },
    { label: "106-114", value: [106, 107, 108, 109, 110, 111, 112, 113, 114] },
  ]);
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const [totalData, setTotalData] = useState([])
  const day = new Date()
  let enteredDate = day.toLocaleDateString()
  enteredDate = enteredDate.replace(/[/]/g,"-")
  // console.log(enteredDate)

  ///////////////// Scroll Down Option for Next Version //////////////////

  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() =>
  //   onChange(),
  //   setRefreshing(false),
  //   )
  // }, []);

  ////////////////// Server Activity /////////////////


  const onChange = async (e) => {
    setTotalData([]);
    const tempTotalData = [];
    for (const i of value) {
      axios
        .get(
          `https://firsttrial-cff1d-default-rtdb.firebaseio.com/hourlyProductionData_v_200/${enteredDate}/${i}.json`
        )
        .then((res) => {
          const tempProd = [];
          let hourProd = 0;
          let target = 0;
          let counter = 0;
          for (const j of hours) {
            if (res.data[j]) {
              tempProd.push(res.data[String(j)]["production"]);
              hourProd = hourProd + res.data[String(j)]["production"]
              target = res.data[String(j)]["target"]
              counter++
            } else {
              tempProd.push(0);
            }
          }
          
          tempTotalData.push(
          { lineNo: i,
            production: tempProd,
            totalProduction: hourProd,
            totalTarget: (counter*target)
           })

           tempTotalData.sort((a, b) => a.lineNo - b.lineNo);

           setTotalData([...tempTotalData])
          
          

          
        });
        // console.log(lineWiseProduction);
    }

    
    
  };

  return (
    <View style={styles.main}>
      <View style={styles.dropDownPicker}>
        <DropDownPicker
          style={styles.dropdown}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          listMode="MODAL"
          modalTitle="Select Your Block"
          modalProps={{ animationType: "fade" }}
          onChangeValue={onChange}
          placeholder="Select A Block"
        />
      </View>
      <View style={styles.chartArea}>
        <ScrollView style={styles.scrollview} 
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >

          {totalData.map((e, index) => {
            // console.log(lineWiseProduction[index])
            // console.log(lineWiseTarget[index])
            
            return (
              <View>
                <View style={styles.lineTextContainer}>
                  <Text style={styles.lineText}>Line No: {e.lineNo}</Text>
                </View>
                <View>
                  <BarChart
                    style={{
                      marginVertical: 8,
                      marginHorizontal: screenWidth * 0.02,
                      borderRadius: 10,
                      paddingRight: 0,
                    }}
                    data={{
                      labels: [
                        "8am",
                        "9am",
                        "10am",
                        "11am",
                        "12pm",
                        "1pm",
                        "2pm",
                        "3pm",
                        "4pm",
                        "5pm",
                        "6pm",
                      ],
                      datasets: [{ data: e.production }],
                    }}
                    width={screenWidth * 0.96}
                    height={220}
                    chartConfig={{
                      backgroundColor: ColorLibrary.body_background,
                      barPercentage: 0.8,
                      backgroundGradientFrom: "#ffffff",
                      backgroundGradientTo: "#ffffff",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      propsForLabels: { fontSize: 10, fontWeight: "bold" },
                    }}
                    verticalLabelRotation={0}
                    showValuesOnTopOfBars={true}
                    withVerticalLabels={true}
                    withHorizontalLabels={false}
                    withInnerLines={false}
                  />
                </View>
                <View style={styles.reportContainer}>
                  <View>
                    <Text style={styles.reportText}>Total Production: {e.totalProduction}</Text>
                  </View>
                  <View style={styles.achievementPercent}>
                  <Text style={styles.reportText}>Achievement: {((e.totalProduction/e.totalTarget)*100).toFixed(2)+"%"}</Text>
                    {/* <Text style={styles.reportText}>Achievement : {((lineWiseProduction[index]/lineWiseTarget[index])*100).toFixed(2)} %</Text> */}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  main: {
    margin: 0,
  },
  scrollview: {
    marginBottom: screenHeight * 0.2,
  },
  lineTextContainer: {
    marginLeft: 8,
  },
  lineText: {
    fontSize: 16,
    fontFamily: "phudu-Black",
    color: ColorLibrary.primary_text_border_button,
  },
  chartArea: {
    backgroundColor: ColorLibrary.body_background,
  },
  reportContainer:{
    flexDirection: 'row',
    marginLeft: screenWidth * 0.04,
    marginBottom: screenHeight * 0.02,
  },
  achievementPercent:{
    marginLeft: screenWidth * 0.1,
  },
  reportText:{
    fontFamily: 'phudu-Regular'
  }
});
