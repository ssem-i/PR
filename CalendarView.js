import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, startOfWeek, addDays } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import RecordAddModal from './RecordAddModal';

function CalendarView() {
const records = [
    { id: 1, date: '2024-11-01', category: '급여', content: 'Test Salary', amount: 5000, type: 'income' },
    { id: 2, date: '2024-11-01', category: '금융', content: 'Test Grocery', amount: 300, type: 'income' },
    { id: 3, date: '2024-11-03', category: '문화/여가', content: 'Test Bonus', amount: 1000, type: 'expense' },
    { id: 4, date: '2024-11-03', category: '주거/통신', content: 'Test Rent', amount: 1500, type: 'expense' },
    { id: 5, date: '2024-11-05', category: '의료/건강', content: 'Test Transportation', amount: 150, type: 'income' },
    { id: 6, date: '2024-11-05', category: '교육', content: 'Test Freelance', amount: 1200, type: 'expense' },
    { id: 7, date: '2024-11-05', category: '패션', content: 'Test Entertainment', amount: 200, type: 'expense' },
    { id: 8, date: '2024-11-08', category: '기타', content: 'Test Investment', amount: 2500, type: 'income' },
    { id: 9, date: '2024-11-24', category: '급여', content: 'Test Salary', amount: 20000, type: 'income' },
    { id: 10, date: '2024-11-24', category: '식비', content: 'Test Grocery', amount: 10, type: 'income' },
    { id: 11, date: '2024-11-25', category: '교통', content: 'Bus Ticket', amount: 20, type: 'income' },
    { id: 12, date: '2024-11-27', category: '문화', content: 'Movie', amount: 10, type: 'expense' },
    { id: 13, date: '2024-11-28', category: '기타', content: 'Test Bonus', amount: 20, type: 'income' },

  ];
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const thisWeekDates = Array.from({ length: 7 }, (_, i) =>
    format(addDays(weekStart, i), "yyyy-MM-dd")
  );
  const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd"),
  );
  const [markedDates, setMarkedDates] = useState({
      [format(today, "yyyy-MM-dd")]: { selected: true, selectedColor: 'red' },
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [expenses, setExpenses] = useState({});
  const [incomes, setIncomses] = useState({});

  useEffect(() => {
      // 날짜별 지출 합계 계산
      const expenseSums = records
        .filter((record) => record.type === 'expense')
        .reduce((acc, curr) => {
          const { date, amount } = curr;
          acc[date] = (acc[date] || 0) + amount;
          return acc;
        }, {});

      const incomeSums = records
              .filter((record) => record.type === 'income')
              .reduce((acc, curr) => {
                const { date, amount } = curr;
                acc[date] = (acc[date] || 0) + amount;
                return acc;
              }, {});
      setIncomses(incomeSums);
      setExpenses(expenseSums);
    }, []);

  const onDayPress = (day) => {
    const newSelectedDate = day.dateString;
    //setSelectedDate(newSelectedDate);   ////
    if (selectedDate !== newSelectedDate) {
    setMarkedDates({
      [newSelectedDate]: { selected: true, selectedColor: 'red' },
    });
    }
    //setSelectedDate(newSelectedDate);
  };

  const renderDay = ({ date, state }) => {
      const dateString = date.dateString; // YYYY-MM-DD
      const expense = expenses[dateString];
      const income = incomes[dateString];
      return (
        <View style={styles.dayContainer}>
          <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
            {date.day}
          </Text>
          {income && <Text style={styles.incomeText}>+ {income}</Text> }
          {expense && <Text style={styles.expenseText}>- {expense}</Text>}
        </View>
      );
    };
  return (
  <View style={styles.view}>
    <Calendar
      //style={styles.calendar}
      onDayPress={onDayPress}
      markedDates={markedDates}
      dayComponent={renderDay}
      theme={{
        arrowColor: 'black',
        todayTextColor: 'red',
        //calendarBackground: 'red',
        //backgroundColor: 'red',
      }}
    />
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => setModalVisible(true)}>
      <Text style={styles.floatingButtonText}>+</Text>
    </TouchableOpacity>
      <RecordAddModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        //onAddRecord={handleAddRecord}
      />
  </View>
  );
}

const styles = StyleSheet.create({
  view:{
    paddingTop: 40,
    flex: 1,
    //backgroundColor: 'red',
  },
  calendar: {
    //paddingTop: 40,
    //borderBottomWidth: 1,
    //borderBottomColor: 'red',
    //width: 400,
    //height: 500,
    //backgroundColor: 'red',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#FF6347',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#fff',
  },

  dayContainer: { alignItems: 'center', justifyContent: 'flex-start', height: 60,
   backgroundColor: '#eaeaea',
   borderRadius: 5,
   width: 50,
   height: 100,
   },
    dayText: { fontSize: 16, color: '#000', marginTop:5, },
    expenseText: { fontSize: 12, color: '#01DFD7', marginTop: 4 },
    incomeText: {fontSize: 12, color: '#DF0174', marginTop: 4  },
    disabledText: { color: '#d3d3d3' },
});

export default CalendarView;