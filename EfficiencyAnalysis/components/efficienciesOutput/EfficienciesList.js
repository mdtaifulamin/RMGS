// import React from "react";
// import { RefreshControl, FlatList, Text, View } from "react-native";
// import EfficiencyItem from "./Efficiencyitem";

// export default function EfficienciesList({ efficiencies, refreshing, onRefresh, }) {
//   const renderEfficiencyItem = ({ item }) => {
//     return (
//       <EfficiencyItem {...item} />
//     );
//   };

//   return (
//     <FlatList
//       data={efficiencies}
//       renderItem={renderEfficiencyItem}
//       keyExtractor={(item) => item.id}
//       refreshControl={
//         <RefreshControl colors={['red', 'green', 'blue']} refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     />
//   );
// }











import React, { useRef } from "react";
import { RefreshControl, FlatList, Text, View, Animated,Dimensions } from "react-native";
import EfficiencyItem from "./Efficiencyitem";


const screenWidth = Dimensions.get('window').width
const screen_height=Dimensions.get('window').height
const cardHeight = screen_height*0.24;
const padding = screen_height*0.008;
const offset = cardHeight + padding;
export default function EfficienciesList({ efficiencies, refreshing, onRefresh,onLongPress}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const renderEfficiencyItem = ({item,index}) => {
    const inputRange = [offset * index, offset * index + offset];
                const outputRange1 =  [1, 0];
                const outputRange2 = [0,offset / 2];
                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: outputRange1,
                    extrapolate: 'clamp',
                });
                const translateY = scrollY.interpolate({
                    inputRange,
                    outputRange: outputRange2,
                    extrapolate: 'clamp',
                });
                const opacity = scale;
    return (
      <Animated.View style={{ opacity: fadeAnim,transform: [{ translateY }, { scale }] } } >
        <EfficiencyItem {...item} />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      style={{paddingVertical:padding/2}}
      data={efficiencies}
      renderItem={renderEfficiencyItem}
      keyExtractor={(item) => item.id}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
    })}
      refreshControl={
        <RefreshControl  colors={['red', 'green', 'blue']} refreshing={refreshing} onRefresh={onRefresh} />
      }
      onLayout={fadeIn}
    />
  );
}

//second code

// import React, { useRef } from "react";
// import { RefreshControl, FlatList, Text, View, Animated } from "react-native";
// import EfficiencyItem from "./Efficiencyitem";

// export default function EfficienciesList({ efficiencies, refreshing, onRefresh }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   const fadeIn = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   };

//   const renderEfficiencyItem = (itemData) => {
//     return (
//       <Animated.View style={{ opacity: fadeAnim }}>
//         <EfficiencyItem {...itemData.item} />
//       </Animated.View>
//     );
//   };

//   return (
//     <FlatList
//       data={efficiencies}
//       renderItem={renderEfficiencyItem}
//       keyExtractor={(item) => item.id}
//       refreshControl={
//         <RefreshControl  colors={['red', 'green', 'blue']} refreshing={refreshing} onRefresh={onRefresh} />
//       }
//       onLayout={fadeIn}
//     />
//   );
// }


// import React, { useRef } from "react";
// import { RefreshControl, FlatList, Text, View, Animated } from "react-native";
// import EfficiencyItem from "./Efficiencyitem";

// const cardHeight = 134;
// const padding = 10;
// const offset = cardHeight + padding;
// export default function EfficienciesList({ efficiencies, refreshing, onRefresh }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const fadeIn = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   };

//   const renderEfficiencyItem = ({ item, index }) => {
//     const inputRange = [offset * index, offset * (index + 1)];
//     const opacity = scrollY.interpolate({
//       inputRange,
//       outputRange: [0, 1],
//       extrapolate: "clamp",
//     });

//     return (
//       <Animated.View style={{ opacity }}>
//         <EfficiencyItem {...item} />
//       </Animated.View>
//     );
//   };

//   return (
//     <FlatList
//       data={efficiencies}
//       renderItem={renderEfficiencyItem}
//       keyExtractor={(item) => item.id}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//         { useNativeDriver: false }
//       )}
//       refreshControl={
//         <RefreshControl
//           colors={["red", "green", "blue"]}
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//         />
//       }
//       onLayout={fadeIn}
//     />
//   );
// }
