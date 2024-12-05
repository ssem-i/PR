import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';

const DatePickerModal = ({ selectedYear, selectedHalf, applyPeriod, closeModal }) => {
  const years = Array.from({ length: 10 }, (_, i) => 2020 + i); // 최근 10년 범위
  const halves = ['상반기', '하반기']; 
  const [currentYear, setCurrentYear] = useState(selectedYear); // 현재 선택된 연도
  const [currentHalf, setCurrentHalf] = useState(selectedHalf); 

  // 선택 시 동작
  const handleSelectYear = (year) => {
    setCurrentYear(year);
  };

  const handleSelectHalf = (half) => {
    setCurrentHalf(half);
  };

  const handleApply = () => {
    applyPeriod(currentYear, currentHalf); //  상위로 전달
    closeModal(); 
  };

  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>기간을 선택하세요</Text>

          {/* 연도 선택 */}
          <FlatList
            data={years}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.button, item === currentYear && styles.selectedButton]}
                onPress={() => handleSelectYear(item)}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {/* 상하반기 선택 */}
          <FlatList
            data={halves}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.button, item === currentHalf && styles.selectedButton]}
                onPress={() => handleSelectHalf(item)}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {/* 적용 버튼 */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>적용</Text>
          </TouchableOpacity>

          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
  list: { flexDirection: 'row', marginBottom: 20 },
  button: { padding: 10, marginHorizontal: 5 },
  selectedButton: { backgroundColor: '#ddd', borderRadius: 5 },
  text: { fontSize: 18 },
  applyButton: { marginTop: 10, backgroundColor: '#ddd', padding: 10, borderRadius: 5 },
  applyButtonText: { fontSize: 16},
  closeButton: { marginTop: 10, backgroundColor: '#ddd', padding: 10, borderRadius: 5 },
  closeButtonText: { fontSize: 16 },
});

export default DatePickerModal;
