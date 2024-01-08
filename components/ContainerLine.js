import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import { ColorLibrary } from "../Style/color";


const ContainerLine = ({line, index, lineValue, setLineValue}) => {

  useEffect(() => {
    console.log('index: '+index)
    console.log('line Value: '+JSON.stringify(lineValue))
  }, [])

  const setTarget = (text) => {
    const tempLineValue = [...lineValue];
    tempLineValue[index]["target"] = Number(text);
    setLineValue(tempLineValue)
  }

  const setProduction = (text) => {
    const tempLineValue = [...lineValue];
    tempLineValue[index]["production"] = Number(text);
    setLineValue(tempLineValue)
  }

  const setRemarks = (text) => {
    const tempLineValue = [...lineValue];
    tempLineValue[index]["issue"] = text;
    setLineValue([...tempLineValue])
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.linetext}>Line No. {line}</Text>
      <View style={styles.dataContainer}>
        <View style={styles.datafield}>
          <Text style={styles.text}>TARGET</Text>
          <TextInput
            value={lineValue[index]?lineValue[index]["target"]:''}
            multiline={true}
            numberOfLines={1}
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={setTarget}
          ></TextInput>
        </View>
        <View style={styles.datafield}>
          <Text style={styles.text}>PRODUCTION</Text>
          <TextInput
            value={lineValue[index]?lineValue[index]["production"]:''}
            multiline={true}
            numberOfLines={1}
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={setProduction}
          ></TextInput>
        </View>
      </View>
      <View style={styles.dataformbundle}>
        <Text style={styles.text}>REMARKS</Text>
        <TextInput
          value={lineValue[index]?lineValue[index]["issue"]:''}
          multiline={true}
          numberOfLines={1}
          style={[styles.textInput, { width: screen_width * 0.92 }]}
          onChangeText={setRemarks}
        ></TextInput>
      </View>
    </View>
  );
};

export default ContainerLine;

const styles = StyleSheet.create({
    mainContainer:{
        marginLeft:screen_width *  0.03,
        marginBottom: screen_width * 0.03,
    },
    textInput:{
        width: "100%",
        height: 40,
        borderWidth: 0.5,
        borderColor:ColorLibrary.primary_text_border_button,
        borderRadius:5,
        textAlign:'center',
        backgroundColor: ColorLibrary.body_background,
        fontSize: 16,

    },
    dataContainer:{
        flexDirection: 'row',
    },
    datafield:{
        paddingRight:20,
        width: "50%"
    },
    scrollview:{
        marginBottom:screen_height * 0.32,
    },
    text:{
        fontSize: 16,
        // fontWeight: 'bold',
        fontFamily: 'Roboto-Bold'
    },
    linetext:{
        color:ColorLibrary.primary_text_border_button,
        fontSize: 18,
        // fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    button:{
        width: screen_width * 0.5,
        alignSelf: 'center',
        marginTop: 10,
    }
})
