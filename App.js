import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
import { Provider } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerNavigator, TabNavigation } from './components/routes';
import Store from './store';

const App = () => {
  const [switchNavi, setSwitchNavi] = useState(false);
  //const pan = useRef(new Animated.ValueXY()).current;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: (evt, gestureState) => {
  //       // Chỉ kích hoạt kéo khi không có chuyển động nhỏ để tránh nhầm với onPress
  //       return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
  //     },
  //     onPanResponderGrant: () => {
  //       pan.setOffset({
  //         x: pan.x._value,
  //         y: pan.y._value,
  //       });
  //     },
  //     onPanResponderMove: Animated.event(
  //       [null, { dx: pan.x, dy: pan.y }],
  //       { useNativeDriver: false }
  //     ),
  //     onPanResponderRelease: (evt, gestureState) => {
  //       pan.flattenOffset();
  //       // Giới hạn trong màn hình
  //       let newX = Math.min(Math.max(0, pan.x._value), screenWidth - 60); // 60 là kích thước của Animated.View
  //       let newY = Math.min(Math.max(0, pan.y._value), screenHeight - 110); // 110 tính cả padding/phần header nếu có

  //       Animated.spring(pan, {
  //         toValue: { x: newX, y: newY },
  //         useNativeDriver: false,
  //       }).start();
  //     },
  //   })
  // ).current;

  return (
    <Provider store={Store}>
      {switchNavi ? <TabNavigation /> : <DrawerNavigator />}

      {/* Draggable Button */}
      {/* <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 20,
            bottom: 60,
            right: 30,
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          },
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
      </Animated.View> */}
        <TouchableOpacity
          onPressIn={() => setSwitchNavi(!switchNavi)} // Phản hồi nhanh khi nhấn
          style={
            {
              position: 'absolute',
              zIndex: 20,
              bottom: 100,
              right: 30,
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
        >
          <MaterialIcons name="change-circle" size={50} color="red" />
        </TouchableOpacity>
    </Provider>
  );
};

export default App;
