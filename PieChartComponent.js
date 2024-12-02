import React, { useState } from 'react'; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import DatePickerModal from './DatePickerModal';

const PieChartComponent = ({ selectedYear = 2024, selectedMonth = 12 }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const generateData = (month) => {
    const categories = {
      식비: Math.floor(Math.random() * 50000),
      교통비: Math.floor(Math.random() * 50000),
      쇼핑: Math.floor(Math.random() * 50000),
      기타: Math.floor(Math.random() * 50000),
      주거비: Math.floor(Math.random() * 50000),
      교육비: Math.floor(Math.random() * 50000),
      건강관리: Math.floor(Math.random() * 50000),
      문화생활: Math.floor(Math.random() * 50000),
      보험료: Math.floor(Math.random() * 50000),
      경조사비: Math.floor(Math.random() * 50000),
    };
    return {
      month,
      categories,
    };
  };

  const data = generateData(selectedMonth);

  const totalExpenses = Object.values(data.categories).reduce((sum, expense) => sum + expense, 0);
  
  const pieData = Object.keys(data.categories).map((category) => ({
    name: category,
    population: (data.categories[category] / totalExpenses) * 100,
    color: category === '식비' ? '#fa9696' :
           category === '교통비' ? '#ffd300' :
           category === '쇼핑' ? '#88c8ff' :
           category === '기타' ? '#7cd06a' :
           category === '주거비' ? '#d287ff' :
           category === '교육비' ? '#ff00ff' :
           category === '건강관리' ? '#00ff00' :
           category === '문화생활' ? '#00ffff' :
           category === '보험료' ? '#ffff00' :
           '#e4b7ff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  }));

  const sortedCategories = Object.entries(data.categories)
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({ category, amount }));

  const openModal = () => setIsModalVisible(true);

  const applyPeriod = (year, month) => {
    console.log(`Selected Year: ${year}, Selected Month: ${month}`);
    setIsModalVisible(false);
  };
  
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedYear}년 {selectedMonth}월
        </Text>
        <TouchableOpacity style={styles.dateButton} onPress={openModal}>
          <Text style={styles.dateButtonText}>기간 설정</Text>
        </TouchableOpacity>
        {isModalVisible && (
          <DatePickerModal
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            applyPeriod={applyPeriod}
            closeModal={closeModal}
            isPieChartModal={true} // PieChart일 경우 true 전달
          />
        )}
      </View>

      <View style={styles.chartWrapper}>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieData}
            width={400}
            height={250}
            chartConfig={{
              backgroundColor: '#ddd',
              backgroundGradientFrom: '#ddd',
              backgroundGradientTo: '#ddd',
              color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              }
            }}
            accessor="population"
            backgroundColor="transparent"
            absolute
            hasLegend={false}
          />
        </View>

        <View style={styles.legendContainer}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.name} ({item.population.toFixed(2)}%)</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.expenseListWrapper}>
        <ScrollView style={styles.expenseList}>
          {sortedCategories.map((item, index) => (
            <View key={index} style={styles.expenseItem}>
              <Text style={styles.expenseCategory}>{item.category}</Text>
              <Text style={styles.expenseAmount}>{item.amount.toLocaleString()} 원</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  dateButton: {
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 25,
  },
  dateButtonText: {
    color: '#000',
    fontSize: 14,
  },
  chartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chartContainer: {
    flex: 1,
  },
  legendContainer: {
    flexDirection: 'column',
    marginLeft: 0,
    width: 150,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColorBox: {
    width: 15,
    height: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  legendText: {
    fontSize: 13,
    color: '#333',
  },
  expenseListWrapper: {
    height: 260,
  },
  expenseList: {
    width: '100%',
    paddingHorizontal: 10,
  },
  expenseItem: {
    backgroundColor: '#eee',
    paddingHorizontal: 50,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  expenseCategory: {
    fontSize: 16,
    color: '#000',
  },
  expenseAmount: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default PieChartComponent;
