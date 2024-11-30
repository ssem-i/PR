
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const ModalComponent = ({ visible, onClose, onAddRecord }) => {
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [category, setCategory] = useState('');
  const [selectedIE, setSelectedIE] = useState(null);
  const [ date, setDate]=useState(new Date());
  const handleAddRecord = () => {
    if (income || expense) {
      onAddRecord(income, expense, memo, category);
      setIncome('');
      setExpense('');
      onClose();
    } else {
    }
  };
   const handleIncomePress = () => {
      console.log('수입선택');
      setSelectedIE('income');
    };

   const handleExpensePress = () => {
     console.log('지출선택');
     setSelectedIE('expense');
   };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.Text2}>날짜</Text>
          <View style={styles.dateContainer}>
              <DatePicker
                date={date}
                onDateChange={setDate}
                mode="date"
                locale="ko"
                theme="light"
                style={{ transform: [{ scale: 0.9 }], width: 151} }
                />
          </View>
          <Text style={styles.Text}>수입 또는 지출 선택</Text>
          <View style={styles.IEbuttonContainer}>
          <TouchableOpacity style={[styles.IEbutton, selectedIE==='income' && styles.selectedIE
          ]}
          onPress={handleIncomePress}
          >
            <Text style={styles.IEtext}>수입</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.IEbutton, selectedIE==='expense' && styles.selectedIE
          ]} onPress={handleExpensePress} >
            <Text style={styles.IEtext}>지출</Text>
          </TouchableOpacity>
          </View>

          <Text style={styles.Text}>금액</Text>
          <TextInput style={styles.input} placeholder="금액을 입력하세요." placeholderTextColor="gray"
          value={amount} onChangeText={setAmount} keyboardType="numeric"/>

          <Text style={styles.Text}>메모</Text>
          <TextInput style={styles.input} placeholder="메모를 입력하세요." placeholderTextColor="gray"
          value={memo} onChangeText={setMemo}/>

          <Text style={styles.Text}>카테고리</Text>
          <View style={styles.viewPicker}>
            <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={styles.picker}
            >
            <Picker.Item label='음식' value="f" style={styles.pickerItem}/>
            <Picker.Item label='교통' value="t" style={styles.pickerItem}/>
            <Picker.Item label='여가' value="p" style={styles.pickerItem}/>
            </Picker>
          </View>

          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.customButton} onPress={onClose}>
              <Text style={styles.IEtext}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={handleAddRecord}>
              <Text style={styles.IEtext}>추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  Text: {
    color: '#000',
    marginTop: 30,
    marginBottom: 10,
  },
  Text2: {
      color: '#000',
      marginTop: 30,
    },
  IEtext: {
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: '#000',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IEbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  IEbutton: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  picker: {
    flex: 1,
    color: '#000',
    backgroundColor: 'lightgrey',
    marginBottom: 70,
  },
  viewPicker: {
    marginBottom: 20,
  },
  pickerItem: {
    fontSize: 14,
    backgroundColor: 'lightgrey',
    color: "#000",
  },
  button: {
    backgroundColor: 'lightgrey',
    color: "#000",
  },
  customButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#E6E6FA',
  },
  selectedIE: {
      backgroundColor: 'grey',
  },
  dateContainer: {
      alignItems: 'center',
    },
});

export default ModalComponent;
