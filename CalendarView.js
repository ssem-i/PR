import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; 
import { getAuth } from 'firebase/auth'; 
import AddBtn from './AddBtn';
import RecordAddModal from './RecordAddModal';

function CalendarView() {
  const [markedDates, setMarkedDates] = useState({}); // 사용자가 선택한 날짜를 저장
  const [modalVisible, setModalVisible] = useState(false); // 추가 모달 표시 여부
  const [expenses, setExpenses] = useState({}); // 날짜별 지출 합계
  const [incomes, setIncomes] = useState({}); // 날짜별 수입 합계
  const [userEmail, setUserEmail] = useState(null); // 로그인된 사용자 이메일

  // 현재 로그인된 사용자의 이메일 가져오기
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserEmail(currentUser.email); 
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }
  }, []);

  // 수입 및 지출 데이터를 가져오기
  useEffect(() => {
    if (!userEmail) return;

    const fetchData = async () => {
      try {

        const incomesQuery = query(
          collection(db, userEmail, 'receipt', 'incomes')
        );

        const expensesQuery = query(
          collection(db, userEmail, 'receipt', 'expenses')
        );

        // 수입 및 지출 데이터 가져오기
        const incomesSnapshot = await getDocs(incomesQuery);
        const expensesSnapshot = await getDocs(expensesQuery);

        // 수입 데이터를 날짜별로 요약
        const incomeSums = incomesSnapshot.docs.reduce((acc, doc) => {
          const data = doc.data();
          const date = data.date.toDate().toISOString().split('T')[0]; // YYYY-MM-DD 형식
          acc[date] = (acc[date] || 0) + data.amount;
          return acc;
        }, {});

        // 지출 데이터를 날짜별로 요약
        const expenseSums = expensesSnapshot.docs.reduce((acc, doc) => {
          const data = doc.data();
          const date = data.date.toDate().toISOString().split('T')[0]; // YYYY-MM-DD 형식
          acc[date] = (acc[date] || 0) + data.amount;
          return acc;
        }, {});

        // 상태에 저장
        setIncomes(incomeSums);
        setExpenses(expenseSums);
      } catch (error) {
        console.error('데이터를 가져오는 동안 오류 발생:', error);
      }
    };

    fetchData();
  }, [userEmail]); // 사용자 이메일이 변경되면 데이터 다시 가져오기

  // 날짜를 선택했을 때 호출되는 함수
  const onDayPress = (day) => {
    const dateString = day.dateString; // YYYY-MM-DD 형식의 날짜
    setMarkedDates({
      [dateString]: { selected: true, selectedColor: 'red' }, // 선택한 날짜 강조
    });
  };

  // 특정 날짜의 수입 및 지출을 렌더링
  const renderDay = ({ date, state }) => {
    const dateString = date.dateString; // YYYY-MM-DD 형식
    const expense = expenses[dateString]; // 해당 날짜의 지출
    const income = incomes[dateString]; // 해당 날짜의 수입
    return (
      <View style={styles.dayContainer}>
        {/* 날짜 표시 */}
        <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
          {date.day}
        </Text>
        {/* 수입 및 지출 표시 */}
        {income && <Text style={styles.incomeText}>+ {income}</Text>}
        {expense && <Text style={styles.expenseText}>- {expense}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.view}>
      {/* 캘린더 컴포넌트 */}
      <Calendar
        onDayPress={onDayPress} // 날짜를 선택했을 때 호출
        markedDates={markedDates} // 선택한 날짜 강조
        dayComponent={renderDay} // 날짜별 렌더링 커스터마이징
        theme={{
          arrowColor: 'black', // 화살표 색상
          todayTextColor: 'red', // 오늘 날짜 색상
        }}
      />
      {/* 내역 추가 버튼 */}
      <AddBtn addPress={() => setModalVisible(true)} />
      {modalVisible && (
        <RecordAddModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)} // 모달 닫기
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 30,
    flex: 1,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    width: 50,
    height: 90,
  },
  dayText: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  expenseText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  incomeText: {
    fontSize: 12,
    color: 'green',
    marginTop: 4,
  },
  disabledText: {
    color: '#d3d3d3',
  },
});

export default CalendarView;
