import React, { useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
//import { format, startOfWeek, addDays } from "date-fns";
import { Calendar } from "react-native-calendars";
//import RecordAddModal from './RecordAddModal';
import CalendarView from './CalendarView';
import Goal from './Goal';
import IEList from './IEList';
import MainScreen from './MainScreen';


export default function TabBar() {
  const [selectedTab, setSelectedTab] = useState('Calendar');
  const renderScreen = () => {
    switch (selectedTab) {
      case 'Calendar':
        return (
        //<View>
        <MainScreen />
        //</View>
        );
      case 'Goal':
        return (
        <View style={{ flex: 1 }}>
          <Goal/>
        </View>
        );
        case 'Statistics':
              return (
                <View>
                  <Text>Statistics Content</Text>
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={handleTabCal}
        >
        <Text style={styles.tabText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          //onPress={}
        >
        <Text style={styles.tabText}>statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={handleTabGoal}
        >
        <Text style={styles.tabText}>Goal</Text>
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
     //backgroundColor: 'yellow',
     flex: 1,
     // paddingBottom: 60,
      //marginBottom: 100,
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
      //justifyContent: 'flex-end',
      //alignItems: 'end',
      height: 60,
      backgroundColor: '#e0e0e0',
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