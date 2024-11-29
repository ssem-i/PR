import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';


export default function GaolAddModal({ visible, onClose, onAddGoal }) {
  const [ goal, setGoal] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ date, setDate]=useState(new Date());
  const [dayLeft, setDayLeft] = useState(0); // 남은 일 수

  const calculateDayLeft = () => {
      const today = new Date(); // 오늘 날짜
      const selectedDate = new Date(date); // 선택된 날짜
      // 날짜 차이 계산 (밀리초 단위 차이를 일 단위로 변환)
      const timeDifference = selectedDate - today;
      const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 밀리초 -> 일 단위로 변환

      setDayLeft(daysLeft);
   };
  useEffect(() => {
   calculateDayLeft();
  }, [date]);

  const handleAdd = () => {
    onAddGoal({ goal,  amount, dayLeft });
    setGoal('');
    setDate(new Date());
    setAmount('');
  }
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>목표를 입력하세요</Text>

          <View style={styles.container}>
          <Text style={styles.containerText}>목표</Text>
          <TextInput style={styles.input} placeholder="목표" placeholderTextColor="gray"
          value={goal} onChangeText={setGoal}
          />
          </View>

          <View style={styles.container}>
          <Text style={styles.containerText}>날짜</Text>
            <DatePicker
              date={date}
              onDateChange={setDate}
              mode="date"
              locale="ko"
              theme="light"
               style={{ transform: [{ scale: 0.9 }], width: 151} }
            />
          </View>
          <View style={styles.container}>
          <Text style={styles.containerText}>금액</Text>
          <TextInput style={styles.input} placeholder="금액(원)" placeholderTextColor="gray" keyboardType="numeric"
          value={amount} onChangeText={setAmount}
          />
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.text}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleAdd}>
            <Text style={styles.text}>추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      alignItems: 'center',
      width: 300,
      height: 600,
      padding: 20,
      backgroundColor: '#f3f3f3',
      borderRadius: 10,
    },
  view: {

    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 35, // 버튼 간의 간격
    borderRadius: 30,
    backgroundColor: 'lightgrey',
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  containerText: {
    color: 'black',
    fontSize: 14,
    marginRight: 15, // Text와 TextInput 사이에 간격을 줄 수 있도록 추가
  },
  input: {
    color: 'black',
    width: 150,
      height: 40,
      borderColor: '#ccc',
      borderBottomWidth: 1,
      //paddingHorizontal: 8,
    },
  viewButton: {
    padding: 10,
      margin: 30,
      //borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 11,
    },
  container: {
   //backgroundColor:'red',
    //paddingHorizontal: 50,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //marginHorizontal: 30,

  },
});