import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { collection, query, getDocs ,where} from 'firebase/firestore';
import { db } from './firebase'; 
import { getAuth } from 'firebase/auth'; 
import DatePickerModal from './DatePickerModal'; 

const BarChartComponent = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // 선택된 연도
  const [selectedHalf, setSelectedHalf] = useState('상반기'); // 선택된 반기
  const [chartData, setChartData] = useState([]); // 차트 데이터
  const [maxIncomeMonth, setMaxIncomeMonth] = useState(null); // 최대 수입 달
  const [maxExpenseMonth, setMaxExpenseMonth] = useState(null); // 최대 지출 달
  const [yAxisMax, setYAxisMax] = useState(0); // Y축 최대값

  // 선택된 연도와 반기가 변경될 때 차트 데이터 가져오기
  useEffect(() => {
    fetchChartData();
  }, [selectedYear, selectedHalf]);

  
  const fetchChartData = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
  
      if (!currentUser) {
        console.error('로그인된 사용자가 없습니다.');
        return;
      }
  
      const userEmail = currentUser.email; // 사용자 이메일
      const months = selectedHalf === '상반기' ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12]; // 상반기/하반기 구분
  
      // 선택된 연도의 시작 및 종료 날짜
      const startOfYear = new Date(selectedYear, 0, 1); 
      const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59); 
  
      // 연도 필터링 추가
      const incomeQuery = query(
        collection(db, userEmail, 'receipt', 'incomes'),
        where('date', '>=', startOfYear),
        where('date', '<=', endOfYear)
      );
  
      const expenseQuery = query(
        collection(db, userEmail, 'receipt', 'expenses'),
        where('date', '>=', startOfYear),
        where('date', '<=', endOfYear)
      );
  
      // 데이터 가져오기
      const incomeSnapshot = await getDocs(incomeQuery);
      const expenseSnapshot = await getDocs(expenseQuery);
  
      // 월별 수입 데이터 집계
      const incomeData = incomeSnapshot.docs.reduce((acc, doc) => {
        const { amount, date } = doc.data();
        const month = new Date(date.toDate()).getMonth() + 1; // 월 추출
        if (months.includes(month)) {
          acc[month] = (acc[month] || 0) + amount;
        }
        return acc;
      }, {});
  
      // 월별 지출 데이터 집계
      const expenseData = expenseSnapshot.docs.reduce((acc, doc) => {
        const { amount, date } = doc.data();
        const month = new Date(date.toDate()).getMonth() + 1; // 월 추출
        if (months.includes(month)) {
          acc[month] = (acc[month] || 0) + amount;
        }
        return acc;
      }, {});
  
      // 차트 데이터 생성
      const data = months.map((month) => ({
        label: `${month}월`,
        income: (incomeData[month] || 0) / 10000, // 만 단위로 변환
        expense: (expenseData[month] || 0) / 10000,
      }));
  
      setChartData(data);
  
      // 최대 수입 및 지출 달 계산
      const maxIncome = data.reduce((max, curr) => (curr.income > max.income ? curr : max), { income: 0 });
      const maxExpense = data.reduce((max, curr) => (curr.expense > max.expense ? curr : max), { expense: 0 });
  
      // Y축 최대값 계산 (6의 배수로 올림)
      const maxValue = Math.max(...data.map((item) => Math.max(item.income, item.expense)));
      const roundedMax = Math.ceil(maxValue / 6) * 6;
      setYAxisMax(roundedMax);
  
      setMaxIncomeMonth(maxIncome);
      setMaxExpenseMonth(maxExpense);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
  
  // 모달 열기
  const openModal = () => setIsModalVisible(true);

  // 모달에서 선택된 연도 및 반기 적용
  const applyPeriod = (year, half) => {
    setSelectedYear(year);
    setSelectedHalf(half);
    setIsModalVisible(false);
  };

  // 모달 닫기
  const closeModal = () => setIsModalVisible(false);

  // 차트 데이터 변환 
  const chartBars = chartData.flatMap((item) => [
    {
      label: item.label,
      value: item.income,
      frontColor: '#ffe0ab', // 수입 색상
    },
    {
      label: '', // 지출 막대는 같은 월이므로 라벨 생략
      value: item.expense,
      frontColor: '#ff7f78', // 지출 색상
    },
  ]);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
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
          />
        )}
      </View>

      {/* 바 차트 */}
      <BarChart
        data={chartBars}
        width={320}
        height={250}
        barWidth={20}
        spacing={30}
        isAnimated
        yAxisLabel="₩"
        yAxisTextStyle={{ fontSize: 12, color: '#333' }}
        yAxisSuffix="만" 
        noOfSections={6}
        maxValue={yAxisMax}
        barStyle={{ borderRadius: 4 }}
        xAxisThickness={0}
        xAxisLabelTextStyle={styles.xAxisLabel}
      />

      {/* 범례 */}
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

      {/* 최대값 정보 */}
      <View style={styles.maxInfoContainer}>
        <Text style={styles.maxInfoText}>수입이 가장 많은 달</Text>
        <Text style={styles.boldText}>{maxIncomeMonth?.label || 'N/A'}</Text>

        <Text style={styles.maxInfoText}>지출이 가장 많은 달</Text>
        <Text style={styles.boldText}>{maxExpenseMonth?.label || 'N/A'}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  dateButtonText: {
    fontSize: 14,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColorBox: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
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
    color: '#000',
  },
});

export default BarChartComponent;
