import axios from 'axios';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { fireStoreDb } from '../lib/firebase';
import { ColorLibrary } from '../Style/color';

const CapacityViewer = () => {
    const [operatorId, setOperatorId] = useState('330');
    const [result, setResult] = useState('')

    const capacityTableHead = ['Process', 'Item', 'Fabric Type', 'Cycle Time']
    const [capacityTableData, setCapacityTableData] = useState([])

    const colRef = collection(fireStoreDb,"capacity");

    const getCapacity = async() => {
        const q = query(colRef, where("id", "==", Number(operatorId)));
        const querySnapshot = await getDocs(q);

        const tempCapacityTableData = [];
        querySnapshot.forEach((d) => {
            const data = d.data();
            tempCapacityTableData.push([data.process, data.item, data.fabric, (data.cycle).toString()]);
            
        })

        setCapacityTableData(tempCapacityTableData);
    }
  return (
    <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Capacity Viewer</Text>
        <View style={styles.searchContainer}>
            <TextInput style={styles.input} value={operatorId} onChangeText={setOperatorId} />
            <Button title='Search' onPress={getCapacity}/>
        </View>
        <View  style={styles.tableContainer}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={capacityTableHead} flexArr={[3, 1, 1, 1]} style={styles.head} textStyle={styles.tableHeaderText}/>
          <Rows data={capacityTableData} flexArr={[3, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
        </Table>
        </View>
        
    </View>
  )
}

export default CapacityViewer


const styles = StyleSheet.create({
    mainContainer: {
        margin:5,
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '50%',
        margin: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    tableContainer: {
        marginVertical: 20,
        width:'100%'
    },
  head: {  height: 40,  backgroundColor: ColorLibrary.body_sub_1 },
  wrapper: { flexDirection: 'row', },
  title: { flex: 1, backgroundColor: ColorLibrary.body_background },
  row: {  height: 28  },
  tableHeaderText:{textAlign: 'center', fontSize:14, fontWeight:'bold' ,fontFamily:'Roboto-Regular' },
  text: { textAlign: 'center', fontSize:10, fontFamily:'Roboto-Regular' }
})