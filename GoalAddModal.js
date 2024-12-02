import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';

const GoalInput= ({goal, setGoal})=>(
  <View style={styles.container}>
    <Text style={styles.containerText}>목표</Text>
    <TextInput style={styles.input}
      placeholder="목표" placeholderTextColor="gray"
      value={goal} onChangeText={setGoal}
    />
  </View>
);

const DateInput = ({date, setDate })=>(
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
);

const AmountInput = ({amount, setAmount})=>(
  <View style={styles.container}>
          <Text style={styles.containerText}>금액</Text>
          <TextInput style={styles.input} placeholder="금액(원)" placeholderTextColor="gray" keyboardType="numeric"
          value={amount} onChangeText={setAmount}
          />
  </View>
);
export default function GaolAddModal({ visible, onClose, onAddGoal }) {
  const [ goal, setGoal] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ date, setDate]=useState(new Date());
  const [dayLeft, setDayLeft] = useState(0); // 남은 일 수

  const calculateDayLeft = () => {
      const today = new Date();
      const selectedDate = new Date(date);
      // 날짜 차이 계산
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

          <GoalInput goal={goal} setGoal={setGoal}/>
          <DateInput date={date} setDate={setDate}/>
          <AmountInput amount={amount} setAmount={setAmount}/>

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
      height: 500,
      padding: 20,
      backgroundColor: '#f3f3f3',
      borderRadius: 10,
    },
  view: {

    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
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
    marginRight: 15,
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