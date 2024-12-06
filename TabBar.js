import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Calendar } from "react-native-calendars";
import CalendarView from './CalendarView';
import Goal from './Goal';
import IEList from './IEList';
import MainScreen from './MainScreen';
import Stat from './StatScreen';

export default function TabBar() {
  const [selectedTab, setSelectedTab] = useState('Calendar');
  const renderScreen = () => {
    switch (selectedTab) {
      case 'Calendar':
        return ( <MainScreen /> );
      case 'Goal':
        return (
        <View style={{ flex: 1 }}>
          <Goal/>
        </View>
        );
        case 'Statistics':
          return (
          <View style={{ flex: 1 }}>
          <Stat/>
          </View>
          );
      default:
        return null;
     }
  };
  const handleTabCal = () => {
        console.log('tab calendar');
        setSelectedTab('Calendar');
  };
  const handleTabGoal= () => {
          console.log('tab goal');
          setSelectedTab('Goal');
  };
  const handleTabStat= () => {
          console.log('tab statistics');
          setSelectedTab('Statistics');
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={handleTabCal}
        >
          <Image style={{ width: 35, height: 35,}}
            source={require('./images/cal.png')}
          />
          <Text style={{color:'black'}}>cal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabButton}
          onPress={handleTabStat} >
          <Image style={{ width: 35, height: 35,}}
            source={require('./images/stats.png')}
          />
          <Text style={{color:'black'}}>stat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={handleTabGoal}
        >
          <Image style={{ width: 35, height: 35,}}
            source={require('./images/goal.png')}
          />
          <Text style={{color:'black'}}>goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      //flexDirection: 'column',
      backgroundColor: 'white',
      //top: 0,
    },
    content: {
     flex: 1,
     // top: 0,
      //justifyContent: 'flex-start',
      //alignItems: 'center', 여백 문제
    },
    tabBar: {
      //position: 'absolute',
      //bottom: 0,
      //left: 0,
      //right: 0,
      flexDirection: 'row',
      height: 60,
      backgroundColor: '#f4eeff',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabText: {
      fontSize: 16,
      color: '#000',
    },

});
