import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from './firebase'; 
import { doc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Authentication 가져오기

const ModalComponent = ({ visible, onClose }) => {
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [category, setCategory] = useState('');
  const [selectedIE, setSelectedIE] = useState(null); 
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser; // 현재 로그인된 사용자 가져오기
    if (currentUser) {
      setUserEmail(currentUser.email); // 이메일 설정
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }
  }, []);

  const handleAddRecord = async () => {
    try {
      if (!amount || !category || !memo || !selectedIE) {
        alert('모든 칸을 입력해주세요.');
        return;
      }

      const data = {
        amount: parseFloat(amount),
        date: Timestamp.fromDate(date),
        category,
        memo,
        type: selectedIE, // 'income' 또는 'expense'
      };

      // Firestore 경로: userEmail -> receipt -> incomes or expenses -> 자동ID문서
      const userCollectionRef = doc(db, userEmail, 'receipt');
      const subCollectionRef = collection(userCollectionRef, selectedIE === 'income' ? 'incomes' : 'expenses');

      // 데이터 추가
      await addDoc(subCollectionRef, data);

      alert('내역이 저장되었습니다!');
      resetForm();
      onClose();
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const resetForm = () => {
    setAmount('');
    setMemo('');
    setCategory('');
    setSelectedIE(null);
    setDate(new Date());
  };

  const handleIncomePress = () => setSelectedIE('income');
  const handleExpensePress = () => setSelectedIE('expense');

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const categories = ['음식', '교통', '여가'];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        setCategory(item);
        setCategoryModalVisible(false);
      }}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>날짜</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
              locale="ko-KR"
            />
          )}

          <Text style={styles.text}>수입 또는 지출 선택</Text>
          <View style={styles.IEbuttonContainer}>
            <TouchableOpacity
              style={[styles.IEbutton, selectedIE === 'income' && styles.selectedIE]}
              onPress={handleIncomePress}
            >
              <Text style={styles.IEtext}>수입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.IEbutton, selectedIE === 'expense' && styles.selectedIE]}
              onPress={handleExpensePress}
            >
              <Text style={styles.IEtext}>지출</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>금액</Text>
          <TextInput
            style={styles.input}
            placeholder="금액을 입력하세요."
            placeholderTextColor="gray"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <Text style={styles.text}>메모</Text>
          <TextInput
            style={styles.input}
            placeholder="메모를 입력하세요."
            placeholderTextColor="gray"
            value={memo}
            onChangeText={setMemo}
          />

          <Text style={styles.text}>카테고리</Text>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text style={styles.categoryButtonText}>
              {category || '카테고리를 선택하세요'}
            </Text>
          </TouchableOpacity>

          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.customButton} onPress={onClose}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={handleAddRecord}>
              <Text style={styles.buttonText}>추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 카테고리 선택 모달 */}
      <Modal
        visible={categoryModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setCategoryModalVisible(false)}
        >
          <View style={styles.categoryModal}>
            <FlatList
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCategoryItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    width: 320,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  datePickerButton: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  IEbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  IEtext: {
    color: '#000',
    fontSize: 16,
  },
  IEbutton: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  selectedIE: {
    backgroundColor: 'grey',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#000',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  customButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  categoryModal: {
    width: 250,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ModalComponent;
