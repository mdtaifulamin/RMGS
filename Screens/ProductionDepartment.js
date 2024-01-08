import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalStyles } from '../constants/styles';
import STYLE from '../lib/STYLE.json';

const ProductionDepartmentPage = () => {
  const [openBuyer, setOpenBuyer] = useState(false);
  const [buyer, setBuyer] = useState("ESPIRIT");
  const [openSalesDocument, setOpenSalesDocument] = useState(false);
  const [salesDocument, setSalesDocument] = useState(null);
  const [salesDocumentItems, setSalesDocumentItems] = useState([]);
  const [styles, setStyles] = useState([]);
  const [buyerItems, setBuyerItems] = useState(Object.keys(STYLE).map((e) => ({ label: e, value: e })));
  
  const [openStyleDocument, setOpenStyleDocument] = useState(false);
  const [styleDocument, setStyleDocument] = useState(null);
  const [styleDocumentItems, setStyleDocumentItems] = useState([]);

  const handleBuyerChange = (selectedBuyer) => {
    setBuyer(selectedBuyer);
  
    // Check if the selectedBuyer exists in STYLE before accessing its properties
    if (STYLE[selectedBuyer]) {
      const selectedBuyerData = STYLE[selectedBuyer];
      //inputs.buyerName.value
      const salesDocumentOptions = Object.keys(selectedBuyerData).map((e) => ({ label: e, value: e }));
      setSalesDocumentItems(salesDocumentOptions);
      setSalesDocument(null); // Reset selected sales document
      setStyleDocument(null)
    } else {
      // Handle the case where the selectedBuyer doesn't exist in STYLE
     // console.error(`Buyer data not found for ${selectedBuyer}`);
    }
  };
  

  const handleSalesDocumentChange = (selectedSalesDocument) => {
    setSalesDocument(selectedSalesDocument);
    if(STYLE[buyer][salesDocument]){
      const selectedSalesDocumentData=STYLE[buyer][salesDocument];
      setStyleDocumentItems(selectedSalesDocumentData.map((e)=>({label:e,value:e})))
    }else{

    }
    // Fetch and update styles based on the selected sales document
    // setStyles([...]); // Update with the fetched styles
  };
  const handleStyleDocumentChange = (selectedStyleDocument) => {
    setStyleDocument(selectedStyleDocument);
    // Fetch and update styles based on the selected sales document
    // setStyles([...]); // Update with the fetched styles
  };
  return (
    <View style={styles.container}>
      {/* Buyer Dropdown */}
      <DropDownPicker
        listMode="MODAL"
        open={openBuyer}
        value={buyer}
        items={buyerItems}
        setOpen={setOpenBuyer}
        setValue={handleBuyerChange}
        setItems={setBuyerItems}
        style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor: 'white', borderWidth: 0.2 }}
        containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
        onChangeValue={handleBuyerChange}
        placeholder="Select Buyer"
        searchable={true}
        placeholderStyle={{
          color: 'red',
          fontWeight: 'bold',
        }}
      />

      {/* Sales Document Dropdown */}
      <DropDownPicker
        listMode="MODAL"
        open={openSalesDocument}
        value={salesDocument}
        items={salesDocumentItems}
        setOpen={setOpenSalesDocument}
        setValue={handleSalesDocumentChange}
        setItems={setSalesDocumentItems}
        style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor: 'white', borderWidth: 0.2, marginTop: 16 }}
        containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
        onChangeValue={handleSalesDocumentChange}
        placeholder="Select Sales Document"
        searchable={true}
        placeholderStyle={{
          color: 'red',
          fontWeight: 'bold',
        }}
      />

      <DropDownPicker
        listMode="MODAL"
        open={openStyleDocument}
        value={styleDocument}
        items={styleDocumentItems}
        setOpen={setOpenStyleDocument}
        setValue={handleStyleDocumentChange}
        setItems={setStyleDocumentItems}
        style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor: 'white', borderWidth: 0.2, marginTop: 16 }}
        containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
        onChangeValue={handleStyleDocumentChange}
        placeholder="Select Style Document"
        searchable={true}
        placeholderStyle={{
          color: 'red',
          fontWeight: 'bold',
        }}
      />

      {/* Add similar DropDownPicker component for Style */}
      {/* Use handleStyleChange as onChangeValue for the Style dropdown */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default ProductionDepartmentPage;
