import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { format, startOfWeek, addDays } from 'date-fns';
import AddBtn from './AddBtn';
import RecordAddModal from './RecordAddModal';

function WeekCalendar() {
  const records = [
    { id: 1, date: '2024-11-24', category: '급여', content: 'Test Salary', amount: 20000, type: 'income' },
    { id: 2, date: '2024-11-24', category: '식비', content: 'Test Grocery', amount: 10, type: 'income' },
    { id: 3, date: '2024-11-25', category: '교통', content: 'Bus Ticket', amount: 20, type: 'income' },
    { id: 4, date: '2024-11-27', category: '문화', content: 'Movie', amount: 10, type: 'expense' },
    { id: 5, date: '2024-11-28', category: '기타', content: 'Test Bonus', amount: 20, type: 'income' },
  ];

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // 주 시작 날짜 (일요일 기준
  const thisWeekDates = Array.from({ length: 7 }, (_, i) =>
    format(addDays(weekStart, i), "yyyy-MM-dd")
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [dailySummary, setDailySummary] = useState({});

  const handleAddPress = () => {
      setModalVisible(true);
  };
  const handleCloseModal = () => {  // 모달 닫기
    setModalVisible(false);
  };

  useEffect(() => {  // 수입 지출 합
    const summary = records.reduce((acc, curr) => {
      const { date, amount, type } = curr;
      if (!acc[date]) {
        acc[date] = { income: 0, expense: 0 };
      }
      if (type === 'income') {
        acc[date].income += amount;
      } else if (type === 'expense') {
        acc[date].expense += amount;
      }
      return acc;
    }, {});
    setDailySummary(summary);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
                  <Text style={ {color:'black', padding : 20}} >△</Text>
                  </View>
      <Text style={styles.title}>이번주 캘린더</Text>
      <View style={styles.weekContainer}>
        {thisWeekDates.map((date) => {
          const income = dailySummary[date]?.income || 0;
          const expense = dailySummary[date]?.expense || 0;

          return (
            <View key={date} style={styles.dayContainer}>
              <Text style={styles.dateText}>{format(new Date(date), 'd')}</Text>
              <Text style={styles.incomeText}>+ {income}</Text>
              <Text style={styles.expenseText}>- {expense}</Text>
            </View>
          );
        })}
      </View>
      <AddBtn addPress={handleAddPress}/>
      {modalVisible && ( // 조건부 렌더링
        <RecordAddModal visible={modalVisible} onClose={handleCloseModal} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 20,
    padding: 3,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    flex: 1,
    height: 100,
    marginHorizontal: 5,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  incomeText: {
    fontSize: 13,
    color: '#DF0174',
  },
  expenseText: {
    fontSize: 13,
    color: '#01DFD7',
  },
});

export default WeekCalendar;
