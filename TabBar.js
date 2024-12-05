import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Goal from './Goal';
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
        <Text style={styles.tabText}>캘린더</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabButton}
          onPress={handleTabStat} >
        <Text style={styles.tabText}>분석</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={handleTabGoal}
        >
        <Text style={styles.tabText}>목표</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
    },
    content: {
     flex: 1,
    },
    tabBar: {
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
