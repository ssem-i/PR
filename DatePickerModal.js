import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';

const DatePickerModal = ({
  selectedYear,
  selectedHalf,
  selectedMonth,
  applyPeriod,
  closeModal,
  isPieChartModal, // PieChart 여부
}) => {
  const years = Array.from({ length: 10 }, (_, i) => 2020 + i); // 최근 10년 범위
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1월~12월
  const halves = ['상반기', '하반기']; // 상반기/하반기
  const [currentYear, setCurrentYear] = useState(selectedYear); // 현재 선택된 연도
  const [currentMonth, setCurrentMonth] = useState(selectedMonth); // 현재 선택된 월
  const [currentHalf, setCurrentHalf] = useState(selectedHalf); // 현재 선택된 상/하반기

  const handleApply = () => {
    if (isPieChartModal) {
      applyPeriod(currentYear, currentMonth); // PieChart: 연도와 월 전달
    } else {
      applyPeriod(currentYear, currentHalf); // BarChart: 연도와 상/하반기 전달
    }
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
                onPress={() => setCurrentYear(item)}
              >
                <Text style={styles.text}>{item}년</Text>
              </TouchableOpacity>
            )}
          />

          {/* PieChart: 월별 선택 */}
          {isPieChartModal && (
            <FlatList
              data={months}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.button, item === currentMonth && styles.selectedButton]}
                  onPress={() => setCurrentMonth(item)}
                >
                  <Text style={styles.text}>{item}월</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* BarChart: 상반기/하반기 선택 */}
          {!isPieChartModal && (
            <FlatList
              data={halves}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.button, item === currentHalf && styles.selectedButton]}
                  onPress={() => setCurrentHalf(item)}
                >
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  list: { flexDirection: 'row', marginBottom: 20 },
  button: { padding: 10, marginHorizontal: 5, borderRadius: 5 },
  selectedButton: { backgroundColor: '#ddd' },
  text: { fontSize: 16 },
  applyButton: {
    marginTop: 10,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: { fontSize: 16 },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: { fontSize: 16 },
});

export default DatePickerModal;
