import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';

const DatePickerModal = ({
  selectedYear,
  selectedHalf,
  selectedMonth,
  applyPeriod,
  closeModal,
  isPieChartModal,
}) => {
  const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const halves = ['상반기', '하반기'];

  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>기간을 선택하세요</Text>
          <FlatList
            data={years}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.yearList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.yearButton, item === selectedYear && styles.selectedYearButton]}
                onPress={() =>
                  isPieChartModal
                    ? applyPeriod(item, selectedMonth) // PieChart 선택 시 연도와 월
                    : applyPeriod(item, selectedHalf) // BarChart 선택 시 연도와 상반기/하반기
                }
              >
                <Text style={styles.yearText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {isPieChartModal && (
            <FlatList
              data={months}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.monthList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.monthButton, item === selectedMonth && styles.selectedMonthButton]}
                  onPress={() => applyPeriod(selectedYear, item)}
                >
                  <Text style={styles.monthText}>{item}월</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {!isPieChartModal && (
            <FlatList
              data={halves}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.halfList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.halfButton, item === selectedHalf && styles.selectedHalfButton]}
                  onPress={() => applyPeriod(selectedYear, item)}
                >
                  <Text style={styles.halfText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          <TouchableOpacity style={styles.applyButton} onPress={closeModal}>
            <Text style={styles.applyButtonText}>적용</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#f3f3f3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  yearList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  yearButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  selectedYearButton: {
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
  },
  yearText: {
    fontSize: 18,
  },
  monthList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  monthButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  selectedMonthButton: {
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
  },
  monthText: {
    fontSize: 18,
  },
  halfList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  halfButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  selectedHalfButton: {
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
  },
  halfText: {
    fontSize: 18,
  },
  applyButton: {
    backgroundColor: '#9b9b9b',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DatePickerModal;