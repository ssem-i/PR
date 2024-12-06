
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions,Easing, ScrollView } from 'react-native';
import WeekCalendar from './WeekCalendar';
import CalendarView from './CalendarView';
import IEList from './IEList';

const SCREEN_HEIGHT = Dimensions.get('window').height;

function MainScreen() {
  const translateY = useRef(new Animated.Value(0)).current; // 드래그 이동 상태값
  const [viewState, setViewState] = React.useState('split');

  const panResponderTop = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => { // 드래그할 때 호출
      if (gestureState.dy > 0) translateY.setValue(gestureState.dy);
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 150) {
            Animated.timing(translateY, {
              toValue: SCREEN_HEIGHT, // CalendarView 전체 화면
              duration: 100,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }).start(() => setViewState('calendar'));
      } else {
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      }
    },
  });
// 캘린더 화면에서 split
  const panResponderCalendar = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy < 0) translateY.setValue(gestureState.dy); // 위로 드래그
    },
    onPanResponderRelease: (e, gestureState) => {
    if (gestureState.dy < -150) {
      setViewState('split');
      Animated.spring(translateY, {
      toValue: 0, useNativeDriver: true,
               // duration: 300,
                //        easing: Easing.out(Easing.ease),
                //friction: 7,
                //tension: 40,
      }).start();
    } else {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, }).start(); // 원래 위치로
      }
    },
  });
// 리스트 전체화면에서 split
    const panResponderList = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) translateY.setValue(gestureState.dy); // 아래로 드래그
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 150) {
          setViewState('split'); // 아래로 드래그
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    });
  const panResponderBottom = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      // 위로 드래그
      //if (gestureState.dy < 0) translateY.setValue(gestureState.dy);
      translateY.setValue(Math.max(gestureState.dy, -SCREEN_HEIGHT / 2));
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy < -150) {
        setViewState('ielist'); // 위로 드래그
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      } else {
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      }
    },
  });
  const panResponderTouchBar = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => { // 아래로 드래그
        if (gestureState.dy > 0) translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 150) {
          setViewState('split');
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    });

  const renderContent = () => {
    switch (viewState) {
      case 'calendar':
        return (
          <Animated.View style={{ flex: 1, }}
            {...panResponderCalendar.panHandlers}>
              <CalendarView />
          </Animated.View>
        );
      case 'ielist':
        return (
          //<Animated.View
          //  style={[{ flex: 1 },{ transform: [{ translateY }] }]}
          //  {...panResponderList.panHandlers}
          //  >
          <View style={{ flex: 1 }} {...panResponderList.panHandlers}>
            <View style={{alignItems: 'center'}}>
            <Text style={ {color:'black', padding : 20}} >△</Text>
            </View>
            <IEList />
          </View>
          //</Animated.View>
        );
      default: // split
        return (
          <View style={styles.splitScreenContainer}>
            <Animated.View
              style={[styles.topHalf, { transform: [{ translateY }] }
              ]}
              {...panResponderTop.panHandlers}
            >
              <WeekCalendar />
            </Animated.View>

            <Animated.View
              style={[styles.bottomHalf, { transform: [{ translateY }] }]}
              {...panResponderBottom.panHandlers}
            >
              <IEList />
            </Animated.View>
          </View>
        );
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'blue',
  },
  splitScreenContainer: {
    flex: 1,
  },
  topHalf: {
    height: SCREEN_HEIGHT / 2,
    backgroundColor: '#f5f5f5',
  },
  bottomHalf: {
    height: SCREEN_HEIGHT / 2,
    backgroundColor: '#eaeaea',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF6347',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default MainScreen;
