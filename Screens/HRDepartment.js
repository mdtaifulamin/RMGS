import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';

const HRDepartmentPage = () => {
  const [excelData, setExcelData] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        const { uri } = result;
        const file = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        setExcelData(file);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const convertExcelToJson = () => {
    if (excelData) {
      try {
        const workbook = XLSX.read(excelData, { type: 'base64' });
        const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log('JSON Data:', jsonData);
      } catch (error) {
        console.error('Error converting Excel to JSON:', error);
      }
    }
  };

  return (
    <View>
      <Button title="Pick Excel File" onPress={pickDocument} />
      {excelData && (
        <Button title="Convert to JSON" onPress={convertExcelToJson} />
      )}
    </View>
  );
};

export default HRDepartmentPage;
