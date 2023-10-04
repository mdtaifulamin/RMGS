import React, { useState } from "react";
import { StyleSheet, View, Text, Switch, TextInput } from "react-native";
import Button from "../../util/Button";
import { GlobalStyles } from "../../../constants/styles";
import { getFormattedDate, momentTime } from "../../util/date";

export default function PermissionForm({ onSubmit, onCancel, defaultValues }) {
  const [admin, setAdmin] = useState(defaultValues ? defaultValues.Admin : false);
  const [hrDepartment, setHRDepartment] = useState(defaultValues ? defaultValues.HRDepartment : false);
  const [ieDepartment, setIEDepartment] = useState(defaultValues ? defaultValues.IEDepartment : false);
  const [productionDepartment, setProductionDepartment] = useState(defaultValues ? defaultValues.ProductionDepartment : false);
  const [qualityDepartment, setQualityDepartment] = useState(defaultValues ? defaultValues.QualityDepartment : false);
  const [efficiencyAnalysis, setEfficiencyAnalysis] = useState(defaultValues ? defaultValues.efficiencyAnalysis : false);
  const [overtime, setOvertime] = useState(defaultValues ? defaultValues.Overtime : false);
  const [target, setTarget] = useState(defaultValues ? defaultValues.target : false);
  const [newOperatorAssessment, setNewOperatorAssessment] = useState(defaultValues ? defaultValues.newOperatorAssessment : false);
  const [block,setBlock]=useState(defaultValues?defaultValues.block?.toString():'')
 //console.log(defaultValues)
  const handleSubmit = () => {
    const permissionData = {
        ID: defaultValues ? defaultValues.ID : '',
        date:  new Date(),
        password: defaultValues ? defaultValues.password : '',
        dept:defaultValues.dept?defaultValues.dept:'',
        Admin: admin,
        HRDepartment: hrDepartment,
        IEDepartment: ieDepartment,
        ProductionDepartment: productionDepartment,
        QualityDepartment: qualityDepartment,
        efficiencyAnalysis: efficiencyAnalysis,
        Overtime: overtime,
        target: target,
        newOperatorAssessment: newOperatorAssessment,
        userName: defaultValues? defaultValues.userName :' ',
        block:block,
      // ...Other fields...
    };
    console.log(permissionData)
    onSubmit(permissionData);
  };

  return (
    <View style={styles.form}>
      {/* Other inputs... */}
      <View style={styles.switchContainer}>
        <Text>Admin</Text>
        <Switch value={admin} onValueChange={() => setAdmin(!admin)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>IE Department</Text>
        <Switch value={ieDepartment} onValueChange={() => setIEDepartment(!ieDepartment)} />
      </View>
      {/* Repeat similar code for other switches */}
      <View style={styles.switchContainer}>
        <Text>Production Department</Text>
        <Switch value={productionDepartment} onValueChange={() => setProductionDepartment(!productionDepartment)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Quality Department</Text>
        <Switch value={qualityDepartment} onValueChange={() => setQualityDepartment(!qualityDepartment)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>HR Department</Text>
        <Switch value={hrDepartment} onValueChange={() => setHRDepartment(!hrDepartment)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Efficiency Analysis</Text>
        <Switch value={efficiencyAnalysis} onValueChange={() => setEfficiencyAnalysis(!efficiencyAnalysis)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Target</Text>
        <Switch value={target} onValueChange={() => setTarget(!target)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Overtime</Text>
        <Switch value={overtime} onValueChange={() => setOvertime(!overtime)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>New Operator Assesment</Text>
        <Switch value={newOperatorAssessment} onValueChange={() => setNewOperatorAssessment(!newOperatorAssessment)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>block</Text>
      </View>
      <TextInput style={{borderWidth:1,padding:5}} value={block} onChangeText={(text) => setBlock(text)}/>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={handleSubmit}>
          Submit
        </Button>
        <Button style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: '1%',
    marginBottom: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  button: {
    minWidth: 130,
    marginHorizontal: 10,
  },
  errortext: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

// ID: inputs.ID.value,//toString(checkevalerror( inputs.lineNumber.value)) ,
// date: new Date(inputs.date.value),
// password: inputs.password.value,
// Admin:        inputs.Admin.value,
// HRDepartment: inputs.HRDepartment.value.toUpperCase().trim().replace(/[^\w\s]+$/, '').replace(/\s+/g, " ").trim(),
// IEDepartment:inputs.IEDepartment.value,
// ProductionDepartment:   inputs.ProductionDepartment.value,
// QualityDepartment:       inputs.QualityDepartment.value,
// efficiencyAnalysis:    inputs.efficiencyAnalysis.value, // eval is removed for removing NaN
// target: inputs.target.value,
// Overtime:      inputs.Overtime.value,
// newOperatorAssesment: inputs.newOperatorAssesment.value,
// Block1:inputs.Block1.value,
// Block2:inputs.Block2.value,