import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BarChart from './BarChartComponent';  // 막대 그래프 컴포넌트
import PieChart from './PieChartComponent';  // 파이 그래프 컴포넌트

const StatScreen = () => {
  const [selectedButton, setSelectedButton] = useState('monthly'); // 기본 'monthly'로 설정

  const handleTabMonth = () => setSelectedButton('monthly');
  const handleTabCate = () => setSelectedButton('category');

  // 화면 렌더링
  const renderScreen = () => {
    switch (selectedButton) {
      case 'monthly':
        return (<BarChart />);
      case 'category':
        return (<PieChart />);
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedButton === 'monthly' && styles.selectedToggleButton]}
          onPress={handleTabMonth}
        >
          <Text style={selectedButton === 'monthly' ? styles.selectedToggleText : styles.toggleText}>
            월별
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedButton === 'category' && styles.selectedToggleButton]}
          onPress={handleTabCate}
        >
          <Text style={selectedButton === 'category' ? styles.selectedToggleText : styles.toggleText}>
            카테고리별
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>{renderScreen()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  toggleButton: {
    flex: 1,
    padding: 20,
    borderRadius: 25,
    marginHorizontal: 18,
    backgroundColor: '#eee',
  },
  selectedToggleButton: {
    backgroundColor: '#ccc',
  },
  toggleText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  selectedToggleText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  chartContainer: {
    //alignItems: 'center',
    marginTop: 20,
  },
  periodText: {
    fontSize: 18,
    marginBottom: 10,
  },
  dateChangeText: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    //alignItems: 'center',
  },
});

export default StatScreen;
