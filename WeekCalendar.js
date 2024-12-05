import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, startOfWeek, addDays } from 'date-fns';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import AddBtn from './AddBtn';
import RecordAddModal from './RecordAddModal';

function WeekCalendar() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dailySummary, setDailySummary] = useState({});
  const [userEmail, setUserEmail] = useState(null);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // 주 시작 날짜 
  const thisWeekDates = Array.from({ length: 7 }, (_, i) =>
    format(addDays(weekStart, i), 'yyyy-MM-dd')
  );

  const handleAddPress = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // 사용자 이메일 가져오기
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserEmail(currentUser.email); 
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }
  }, []);

  //  1주일 데이터 가져오기
  useEffect(() => {
    if (!userEmail) return;

    const fetchWeeklyRecords = async () => {
      try {
        // 쿼리 설정
        const startDate = new Date(thisWeekDates[0]); // 주 시작 날짜
        const endDate = new Date(thisWeekDates[6]); // 주 마지막 날짜
        endDate.setHours(23, 59, 59, 999); // 하루의 끝

        const incomesQuery = query(
          collection(db, userEmail, 'receipt', 'incomes'),
          where('date', '>=', startDate),
          where('date', '<=', endDate)
        );
        const expensesQuery = query(
          collection(db, userEmail, 'receipt', 'expenses'),
          where('date', '>=', startDate),
          where('date', '<=', endDate)
        );

        // 데이터 가져오기
        const incomesSnapshot = await getDocs(incomesQuery);
        const expensesSnapshot = await getDocs(expensesQuery);

        
        const incomes = incomesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'income',
        }));

        const expenses = expensesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'expense',
        }));

        // 데이터 병합 및 요약 생성
        const mergedRecords = [...incomes, ...expenses];

        const summary = mergedRecords.reduce((acc, curr) => {
          const formattedDate = format(new Date(curr.date.seconds * 1000), 'yyyy-MM-dd');
          if (!acc[formattedDate]) {
            acc[formattedDate] = { income: 0, expense: 0 };
          }
          if (curr.type === 'income') {
            acc[formattedDate].income += curr.amount;
          } else if (curr.type === 'expense') {
            acc[formattedDate].expense += curr.amount;
          }
          return acc;
        }, {});

        setDailySummary(summary);
      } catch (error) {
        console.error('데이터를 가져오는 동안 오류 발생:', error);
      }
    };

    fetchWeeklyRecords();
  }, [userEmail]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'black', padding: 20 }}>△</Text>
      </View>
      <Text style={styles.title}>이번주 캘린더</Text>
      <View style={styles.weekContainer}>
        {thisWeekDates.map(date => {
          const income = dailySummary[date]?.income || 0;
          const expense = dailySummary[date]?.expense || 0;

          return (
            <View key={date} style={styles.dayContainer}>
              <Text style={styles.dateText}>{format(new Date(date), 'd')}</Text>
              <Text style={styles.incomeText}>+ {income.toLocaleString()}</Text>
              <Text style={styles.expenseText}>- {expense.toLocaleString()}</Text>
            </View>
          );
        })}
      </View>
      <AddBtn addPress={handleAddPress} />
      {modalVisible && (
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
    color: 'black',
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
    fontSize: 12,
    color: 'green',
  },
  expenseText: {
    fontSize: 12,
    color: 'red',
  },
});

export default WeekCalendar;
