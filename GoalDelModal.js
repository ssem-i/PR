import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function GaolDelModal({ visible, onClose, onConfirmDel }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>

          <Text style={styles.text}>목표를 삭제하시겠습니까?</Text>
          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.btn}
            onPress={onConfirmDel}
            >
              <Text style={styles.text}>예</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.text}>아니오</Text>
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
      height: 160,
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
      width: 150,
      height: 40,
      borderColor: '#ccc',
      borderBottomWidth: 1,
      //paddingHorizontal: 8,
    },
  viewButton: {
    padding: 10,
      margin: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 11,  // 버튼 간격
    },
  container: {
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
  },
});