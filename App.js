import React, {useContext, useState} from 'react';

import {View, Text, TouchableOpacity, TextInput, Modal, Button, StyleSheet} from 'react-native';
import { format, startOfWeek, addDays } from "date-fns";
import { Calendar } from "react-native-calendars";
import ModalComponent from './ModalComponent';
import CalendarView from './CalendarView';

import TabBar from './TabBar';


export default function App() {
  //const [selectedTab, setSelectedTab] = useState('Calendar');
  //const handleAddRecord = (income, expense, selectedDate) => {
  //    const today = new Date().toISOString().split('T')[0];
  //    const Record = {
  //      income: parseFloat(income),
  //      expense: parseFloat(expense),
  //      date: selectedDate,
  //    };
  //    console.log(Record);
          //추가
  //};

  type MachineState = | { lael: 'idle'; }
    | { label: 'touchdecision'; originTouchPoint: TouchPoint; }
    | { label: 'touchmove'; prePosition: number; recentPositionHistory:
        { timestamp: number; position: number; }[]; }
    | { label: 'snap'; startAt: number; startedPosition: number; }


  return (
    <View style={styles.container}>

          <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },

});