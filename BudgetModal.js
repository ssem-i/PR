import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function BudgetModal({ visible, onClose }) {
  const [monthlyBudget, setMonthlyBudget]=useState('');
  const [dayBudget, setDayBudget]=useState('');
  const handleApply = () => {
      onApply(monthlyBudget, dayBudget); // 부모 컴포넌트에 데이터 전달
      setMonthlyBudget('');
      setDayBudget('');
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>예산을 입력하세요</Text>
          <View style={styles.container}>
            <Text style={styles.containerText}>월별 예산</Text>
            <TextInput style={styles.input} placeholder="월별 예산(원)" placeholderTextColor="gray"
            value={monthlyBudget} onChangeText={setMonthlyBudget} keyboardType="numeric"

            />
          </View>
          <View style={styles.container}>
            <Text style={styles.containerText}>일별 예산</Text>
            <TextInput style={styles.input} placeholder="일별 예산(원)" placeholderTextColor="gray"
            value={dayBudget} onChangeText={setDayBudget} keyboardType="numeric"

          />
          </View>


          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.text}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}
              onPress={handleApply}
            >
            <Text style={styles.text}>적용</Text>
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
      width: 150,
      height: 40,
      borderColor: '#ccc',
      borderBottomWidth: 1,
      color:'black',
      //paddingHorizontal: 8,
    },
  viewButton: {
    padding: 10,
      margin: 30,
      //borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 11,  // 버튼 간의 간격
    },
  container: {
   //backgroundColor:'red',
    //paddingHorizontal: 50,
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //marginHorizontal: 30,

  },
});