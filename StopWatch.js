import React, {useEffect, useRef, useState, } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const Stopwatch = ({laps, setLaps}) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    const [start, setStart] = useState(0)
    

    const myInterval = useRef();
    const scrollViewRef = useRef();

    const [min, setMin] = useState(Number.MAX_SAFE_INTEGER);
    const [max, setMax] = useState(Number.MIN_SAFE_INTEGER);

    useEffect(() => {
        return () => clearInterval(myInterval.current);
      }, []);

    useEffect(() => {
      
        if (isRunning) {
        myInterval.current = setInterval(
            () => setTimeElapsed(new Date().getTime()),
            80
        );
        } else {
        clearInterval(myInterval.current);
        myInterval.current = null;
        }
    }, [isRunning]);

    function msToTime(s) {
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
    
      return pad(mins) + ':' + pad(secs) + '.' + pad(ms,2);
    }


      const startTimer = () => {
        setStart(new Date().getTime());
        setTimeElapsed(new Date().getTime());
        setIsRunning(true)
      }

      const stopTimer = () => {
        setStart(0);
        setTimeElapsed(0);
        setIsRunning(false);
      }

       const reset = () => {
        
        setIsRunning(false);
        setTimeElapsed(0)
        setLaps([])
        setStart(0);
        console.log('t')
      }

      const addLap = () => {
        
        const tempLaps = [...laps]
        tempLaps.push(((timeElapsed - start)/1000).toFixed(2));
        setStart(new Date().getTime());
        
        setLaps(tempLaps);
        minMax(tempLaps);        
      }

      const deleteLap = (id) => {
        const tempLaps = [...laps]
        let newLaps = []
        tempLaps.forEach((val, idx) => {
          if(id!==idx)
            newLaps.push(val)
        })
        
        setLaps([...newLaps]);
        minMax([...newLaps]);
      }

      const minMax = (tempLaps) => {
        let tempMin = Number.MAX_SAFE_INTEGER;
        let tempMax = Number.MIN_SAFE_INTEGER;
        if(tempLaps.length>2)
        {
          tempLaps.forEach(lap => {
            if (lap < tempMin) tempMin = lap;
            if (lap > tempMax) tempMax = lap;
          });
        }
        
        setMin(tempMin);
        setMax(tempMax);
        console.log('min: '+min+' max: '+max);
      }
      // React.useImperativeHandle(ref, () => ({
      //   reset, 
      // }));
  return (
    <View style={styles.timerContainer}>
        <View style={styles.timer}>
          <Text style={styles.timerText} >{msToTime(timeElapsed - start)}</Text>
        </View>
        

        <ScrollView style={styles.scrollView} ref={scrollViewRef} >
            {laps.slice(0).reverse().map((e,i) => 
            <View style={styles.lap} key={i}>
              <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:12, alignSelf:'center', color:`${e===min?'green':e===max?'red':'black'}`}}>Lap {laps.length - i}:</Text>
              <Text style={{fontSize:20,marginHorizontal:30, alignItems:'center', color:`${e===min?'green':e===max?'red':'black'}`}}>{e} s</Text>
            </View>
                
            <TouchableOpacity onPress={() => deleteLap(laps.length - i - 1)}>
              <AntDesign name="closesquareo" size={24} color="black" />
            </TouchableOpacity>
            </View>
            )}
        </ScrollView> 


        <View style={{flexDirection:'row'}}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={isRunning?stopTimer:startTimer} >
                    <Text style={styles.buttonTitle}>{isRunning?'STOP':'START'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={isRunning?addLap:reset} >
                    <Text style={styles.buttonTitle}>{isRunning?'LAP':'RESET'}</Text>
                </TouchableOpacity>
            </View>
            
        </View>
               
    </View>
    
  )
}

export default Stopwatch;

const styles = StyleSheet.create({
    timerContainer: {
      flex:1, 
      flexDirection:'column', 
      justifyContent:'center',
      marginTop:0,  
      alignItems:'center'
    },
    timer: { 
      padding:1, 
      margin:3, 
    },
    timerText: {
      fontSize:40,
      fontWeight:'bold', 
      margin:1
    },
    scrollView: {
      height:100, 
      width:300,  
      margin:5
    },
    buttonContainer: {
      paddingVertical:10, 
      paddingHorizontal:30
    },
    button: {
      width: 70,
      height: 70,
      borderRadius: 35,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#7bf1a8',
    },
    buttonTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    lap: {
      width: '100%',
      flexDirection: "row",
      justifyContent:'space-evenly',
      alignItems:'center',
      borderColor: "#ced4da",
      borderTopWidth: 1,
      paddingVertical: 2,
      paddingLeft: 1,
      backgroundColor: 'white',
    },
})