import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import DatePickerModal from './DatePickerModal';

const BarChartComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedHalf, setSelectedHalf] = useState('상반기');
  
  const generateData = (half) => {
    const months = half === '상반기' ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12];
    const data = months.map((month) => ({
      month: `${month}월`,
      income: Math.floor(Math.random() * 100000),  // 수입 값
      expense: Math.floor(Math.random() * 100000),  // 지출 값
    }));
    return data;
  };

  const data = generateData(selectedHalf);

  const maxIncomeMonth = data.reduce((prev, curr) => (curr.income > prev.income ? curr : prev));
  const maxExpenseMonth = data.reduce((prev, curr) => (curr.expense > prev.expense ? curr : prev));

  // 바 데이터 배열을 생성
  const bars = data.flatMap(item => [
    {
      label: `${item.month}(수입)`,
      value: item.income,
      frontColor: '#ffe0ab',
      flex: 1, 
    },
    {
      label: `${item.month}(지출)`,
      value: item.expense,
      frontColor: '#ff7f78',
      flex: 1, 
    }
  ]);

  // 빈 데이터를 추가하여 달 간격을 늘리기 위한 함수
  const addSpacingData = () => {
    let spacingBars = [];
    for (let i = 0; i < data.length; i++) {
      spacingBars.push({
        label: data[i].month,
        value: data[i].income,
        frontColor: '#ffe0ab',
        flex: 1,
      });
      spacingBars.push({
        label: data[i].month,
        value: data[i].expense,
        frontColor: '#ff7f78',
        flex: 1,
      });
      
      // 달 간격을 추가하기 위해 빈 값을 넣어줌
      if (i < data.length - 1) {
        spacingBars.push({
          label: '', // 빈 라벨로 간격을 띄움
          value: 0,
          frontColor: 'transparent', // 투명한 색상
          flex: 0,
        });
      }
    }
    return spacingBars;
  };

  const spacingBars = addSpacingData();  // 간격을 추가한 막대


  const openModal = () => setIsModalVisible(true);

  const applyPeriod = (year, half) => {
    setSelectedYear(year);
    setSelectedHalf(half);
    setIsModalVisible(false);
  };

  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedYear}년 {selectedHalf}
        </Text>
        <TouchableOpacity style={styles.dateButton} onPress={openModal}>
          <Text style={styles.dateButtonText}>기간 설정</Text>
        </TouchableOpacity>
        {isModalVisible && (
          <DatePickerModal
            selectedYear={selectedYear}
            selectedHalf={selectedHalf}
            applyPeriod={applyPeriod}
            closeModal={closeModal}
            isPieChartModal={false} // BarChart일 경우 false 전달
          />
        )}
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          data={spacingBars}
          width={300}
          height={230}
          barWidth={17}
          isAnimated
          spacing={0.5}
          yAxisLabel="₩"
          noOfSections={5}
          barStyle={{ borderRadius: 5 }}
          xAxisLabel="월"
          xAxisLabelTextStyle={{ fontSize: 10, color: '#333' }}
          xAxisLabelRenderer={({ label }) => {
            // 빈 막대에는 라벨을 표시하지 않도록 함
            return label ? <Text style={styles.xAxisLabel}>{label}</Text> : null;
          }}
        />
        
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: '#ffe0ab' }]} />
            <Text style={styles.legendText}>수입</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: '#ff7f78' }]} />
            <Text style={styles.legendText}>지출</Text>
          </View>
        </View>
      </View>

      <View style={styles.maxInfoContainer}>
        <Text style={styles.maxInfoText}>수입이 가장 많은 달</Text>
        <Text style={styles.boldText}>{maxIncomeMonth.month}</Text>

        <Text style={styles.maxInfoText}>지출이 가장 많은 달</Text>
        <Text style={styles.boldText}>{maxExpenseMonth.month}</Text> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //padding: 10,
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
    marginTop: 0,
    marginLeft: 10,
    borderRadius: 25,
  },
  dateButtonText: {
    color: '#000',
    fontSize: 14,
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
  },
  xAxisLabel: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    color: '#333',
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  legendItem: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  legendColorBox: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  maxInfoContainer: {
    marginLeft: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  maxInfoText: {
    fontSize: 15,
    backgroundColor: '#eee',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  boldText: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#000'
  },
});

export default BarChartComponent;
