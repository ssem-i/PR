import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const GoalInput = ({ goal, setGoal }) => (
  <View style={styles.container}>
    <Text style={styles.containerText}>목표</Text>
    <TextInput
      style={styles.input}
      placeholder="목표"
      placeholderTextColor="gray"
      value={goal}
      onChangeText={setGoal}
    />
  </View>
);

const DateInput = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>날짜</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          locale="ko-KR"
        />
      )}
    </View>
  );
};

const AmountInput = ({ amount, setAmount }) => (
  <View style={styles.container}>
    <Text style={styles.containerText}>금액</Text>
    <TextInput
      style={styles.input}
      placeholder="금액(원)"
      placeholderTextColor="gray"
      keyboardType="numeric"
      value={amount}
      onChangeText={setAmount}
    />
  </View>
);

export default function GoalAddModal({ visible, onClose, onAddGoal }) {
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [dayLeft, setDayLeft] = useState(0);

  const calculateDayLeft = () => {
    const today = new Date();
    const timeDifference = new Date(date).getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setDayLeft(daysLeft);
  };

  useEffect(() => {
    calculateDayLeft();
  }, [date]);

  const handleAdd = () => {
    onAddGoal({ goal, amount, dayLeft });
    setGoal('');
    setDate(new Date());
    setAmount('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>목표를 입력하세요</Text>

          <GoalInput goal={goal} setGoal={setGoal} />
          <DateInput date={date} setDate={setDate} />
          <AmountInput amount={amount} setAmount={setAmount} />

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
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 35,
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
  },
  viewButton: {
    padding: 10,
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 11,
  },
  container: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  datePickerButton: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    width: 150,
    alignItems: 'center',
  },
  datePickerText: {
    color: 'black',
  },
});
