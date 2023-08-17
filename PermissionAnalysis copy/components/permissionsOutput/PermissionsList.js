// import React from "react";
// import { RefreshControl, FlatList, Text, View } from "react-native";
// import PermissionItem from "./Permissionitem";

// export default function PermissionsList({ permissions, refreshing, onRefresh, }) {
//   const renderPermissionItem = ({ item }) => {
//     return (
//       <PermissionItem {...item} />
//     );
//   };

//   return (
//     <FlatList
//       data={permissions}
//       renderItem={renderPermissionItem}
//       keyExtractor={(item) => item.id}
//       refreshControl={
//         <RefreshControl colors={['red', 'green', 'blue']} refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     />
//   );
// }











import React, { useRef } from "react";
import { RefreshControl, FlatList, Text, View, Animated,Dimensions } from "react-native";
import PermissionItem from "./Permissionitem";


const screenWidth = Dimensions.get('window').width
const screen_height=Dimensions.get('window').height
const cardHeight = screen_height*0.15;
const padding = screen_height*0.008;
const offset = cardHeight + padding;
export default function PermissionsList({ permissions, refreshing, onRefresh,onLongPress}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const renderPermissionItem = ({item,index}) => {
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
        <PermissionItem {...item} />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      style={{paddingVertical:padding/2}}
      data={permissions}
      renderItem={renderPermissionItem}
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
// import PermissionItem from "./Permissionitem";

// export default function PermissionsList({ permissions, refreshing, onRefresh }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   const fadeIn = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   };

//   const renderPermissionItem = (itemData) => {
//     return (
//       <Animated.View style={{ opacity: fadeAnim }}>
//         <PermissionItem {...itemData.item} />
//       </Animated.View>
//     );
//   };

//   return (
//     <FlatList
//       data={permissions}
//       renderItem={renderPermissionItem}
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
// import PermissionItem from "./Permissionitem";

// const cardHeight = 134;
// const padding = 10;
// const offset = cardHeight + padding;
// export default function PermissionsList({ permissions, refreshing, onRefresh }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const fadeIn = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   };

//   const renderPermissionItem = ({ item, index }) => {
//     const inputRange = [offset * index, offset * (index + 1)];
//     const opacity = scrollY.interpolate({
//       inputRange,
//       outputRange: [0, 1],
//       extrapolate: "clamp",
//     });

//     return (
//       <Animated.View style={{ opacity }}>
//         <PermissionItem {...item} />
//       </Animated.View>
//     );
//   };

//   return (
//     <FlatList
//       data={permissions}
//       renderItem={renderPermissionItem}
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
