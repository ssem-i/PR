import React from 'react';
import TabBar from './TabBar';
import MainScreen from './MainScreen';
import { View, StyleSheet } from 'react-native';
export default function MainS() {
  return (
    <View>

      <View style={styles.tabView}>
      <TabBar/>
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  tabView: {
    //justifyContent: 'flex-end',
    //position: 'absolute',   // 절대위치로 설정
    //    bottom: 0,              // 하단에 배치
  }
});