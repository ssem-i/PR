import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function GaolAmountModal2({ visible, onClose }) {

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>목표 금액 추가</Text>
          <View style={styles.container}>
          <Text style={styles.containerText}>금액</Text>
          <TextInput style={styles.input} placeholder="금액(원)" placeholderTextColor="gray" keyboardType="numeric"
          //value={} onChangeText={}
          />
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.text}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
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
    marginTop: 30,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //marginHorizontal: 30,

  },
});