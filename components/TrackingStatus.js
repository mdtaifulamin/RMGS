import React, { useState, useEffect } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, UIManager, View } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TrackingStatus = ({ currentIndex, statuses, activeColor }) => {
  const [activeIndex, setActive] = useState(currentIndex);

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
    setActive(currentIndex);
  }, [currentIndex]);

  const marginLeft = (((100 / (statuses.length - 1)) * activeIndex) - 100) + '%';

  return (
    <View style={styles.container}>
      {/* <Text style={styles.prop}>{activeIndex}</Text> */}
      <View style={styles.statusContainer}>
        <View style={styles.line}>
          <View style={[styles.activeLine, { marginLeft }]} />
        </View>
        {statuses.map((status, index) => (
          <View style={[styles.dot]} key={status}>
            <View style={[index <= activeIndex ? { height: '100%', width: '100%' } : { height: '40%', width: '40%' }, { backgroundColor: activeColor, borderRadius: 20 }]} />
          </View>
        ))}
        <View style={styles.labelContainer}>
          {statuses.map((status, index) => (
            <Text key={status} numberOfLines={1} style={[index % 2 == 0 ? { top: 20 } : { top: -20 }, styles.label]}>{status}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 70,
    justifyContent: 'space-around',
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 5,
    width: '100%',
    backgroundColor: '#ccc',
    position: 'absolute',
    borderRadius: 5,
    overflow: 'hidden',
  },
  activeLine: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  labelContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
  },
  prop: {
    marginBottom: 20,
    width: 100,
    textAlign: 'center',
  },
});

export default TrackingStatus;
