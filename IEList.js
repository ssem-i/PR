import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from './firebase'; // Firestore 설정 파일 가져오기
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import { collection, getDocs } from 'firebase/firestore';

export default function IEList() {
  const [records, setRecords] = useState([]);
  const [userEmail, setUserEmail] = useState(null); // 사용자 이메일 상태

  // 날짜 형식 변환 함수
  function formatDate(timestamp) {
    if (!timestamp || !timestamp.seconds) return '';
    const date = new Date(timestamp.seconds * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 로그인된 사용자 이메일 가져오기
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserEmail(currentUser.email); // 사용자 이메일 설정
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }
  }, []);

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    if (!userEmail) return; // 이메일이 없으면 데이터 로드 중단

    const fetchRecords = async () => {
      try {
        const incomesSnapshot = await getDocs(collection(db, userEmail, 'receipt', 'incomes'));
        const expensesSnapshot = await getDocs(collection(db, userEmail, 'receipt', 'expenses'));

        // Firestore 데이터 매핑
        const incomes = incomesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'income', // 수입
        }));

        const expenses = expensesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'expense', // 지출
        }));

        // 수입과 지출 데이터 병합
        const mergedRecords = [...incomes, ...expenses];

        // 상태 설정
        setRecords(mergedRecords);
      } catch (error) {
        console.error('데이터를 가져오는 동안 오류가 발생했습니다:', error);
      }
    };

    fetchRecords();
  }, [userEmail]); // userEmail이 변경되면 데이터 다시 로드

  // 날짜별로 그룹화
  const groupedRecords = records.reduce((acc, record) => {
    const formattedDate = formatDate(record.date); // 날짜 형식 변환
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(record);
    return acc;
  }, {});

  // 날짜별로 렌더링할 항목
  const groupedData = Object.entries(groupedRecords).map(([date, records]) => ({
    date,
    records,
  }));

  function IEItem({ category, content, type, amount }) {
    return (
      <View>
        <View style={styles.item}>
          <Text style={styles.text}>{category}</Text>
          <Text style={styles.text}>{content}</Text>
          <Text style={styles.text}>{(type === 'income' ? '+ ' : '- ') + amount}</Text>
        </View>
      </View>
    );
  }

  function DateSection({ date, records }) {
    return (
      <View style={styles.dateSection}>
        <Text style={styles.textDate}>{date}</Text>
        {records.map(record => (
          <IEItem
            key={record.id}
            category={record.category}
            content={record.memo || record.content}
            type={record.type}
            amount={record.amount}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.flatListView}>
      <Text style={styles.textTitle}>수입 지출 내역</Text>
      <FlatList
        style={styles.flatList}
        data={groupedData}
        renderItem={({ item }) => <DateSection date={item.date} records={item.records} />}
        keyExtractor={item => item.date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListView: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatList: {
    backgroundColor: '#eaeaea',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3,
    marginHorizontal: 7,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  textTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  textDate: {
    padding: 10,
    color: 'black',
  },
  dateSection: {},
});
