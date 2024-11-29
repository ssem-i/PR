import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Modal, Button, StyleSheet, FlatList } from 'react-native';


export default function IEList() {

  const records = [
    { id: 1, date: '2024-11-01', category: '급여', content: 'Test Salary', amount: 5000, type: 'income' },
    { id: 2, date: '2024-11-01', category: '금융', content: 'Test Grocery', amount: 300, type: 'income' },
    { id: 3, date: '2024-11-03', category: '문화/여가', content: 'Test Bonus', amount: 1000, type: 'expense' },
    { id: 4, date: '2024-11-03', category: '주거/통신', content: 'Test Rent', amount: 1500, type: 'expense' },
    { id: 5, date: '2024-11-05', category: '의료/건강', content: 'Test Transportation', amount: 150, type: 'income' },
    { id: 6, date: '2024-11-05', category: '교육', content: 'Test Freelance', amount: 1200, type: 'expense' },
    { id: 7, date: '2024-11-05', category: '패션', content: 'Test Entertainment', amount: 200, type: 'expense' },
    { id: 8, date: '2024-11-08', category: '기타', content: 'Test Investment', amount: 2500, type: 'income' },
    { id: 9, date: '2024-11-08', category: '경조사/회비', content: 'Test Healthcare', amount: 450, type: 'expense' },
    { id: 10, date: '2024-11-10', category: '교통/차량', content: 'Test Miscellaneous', amount: 100, type: 'income' },
    { id: 11, date: '2024-11-10', category: '식비', content: 'Test', amount: 100, type: 'income' },
    { id: 12, date: '2024-11-12', category: '여행', content: 'Test Airfare', amount: 30000, type: 'expense' },
    { id: 13, date: '2024-11-14', category: '식비', content: 'Test Coffee', amount: 2000, type: 'expense' },
    { id: 14, date: '2024-11-15', category: '의료/건강', content: 'Test Prescription', amount: 500, type: 'expense' },
    { id: 15, date: '2024-11-16', category: '교통/차량', content: 'Test Taxi', amount: 1500, type: 'expense' },
    { id: 16, date: '2024-11-17', category: '마트', content: 'Test Shopping', amount: 10000, type: 'expense' },
    { id: 17, date: '2024-11-18', category: '식비', content: 'Test Dinner', amount: 5000, type: 'expense' },
  ];
  // 날짜별로 그룹화하기
    const groupedRecords = records.reduce((acc, record) => {
      if (!acc[record.date]) {
        acc[record.date] = [];
      }
      acc[record.date].push(record);
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
           <Text style={styles.text}>{ (type? '+ ' : '- ') + amount}</Text>
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
              content={record.content}
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
       renderItem={({ item }) => (
         <DateSection date={item.date} records={item.records} />
       )}
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
      //marginTop: 20,
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
      fontSize: 14,
      color: 'black',
    },
    text: {
      color: 'black',
      fontSize: 14,
    },
    textDate: {
      padding: 10,

      color: 'black',
    },
    dateSection: {

    },
});