import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import DatePickerModal from './DatePickerModal';

const PieChartComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 선택된 월
  const [categoriesData, setCategoriesData] = useState({}); // 카테고리별 지출 데이터
  const [pieData, setPieData] = useState([]); // 파이 차트 데이터

  useEffect(() => {
    fetchCategoryData();
  }, [selectedYear, selectedMonth]);

  // 카테고리별 지출 데이터를 가져오는 함수
  const fetchCategoryData = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('사용자 없음');
        return;
      }

      const userEmail = currentUser.email; // 사용자 이메일
      const startDate = new Date(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1); // 다음 달의 시작일로 설정
      endDate.setDate(0); // 해당 월의 마지막 날로 설정

      // 지출 데이터 가져오기
      const expensesQuery = query(
        collection(db, userEmail, 'receipt', 'expenses'),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );

      const expenseSnapshot = await getDocs(expensesQuery);

      const categories = expenseSnapshot.docs.reduce((acc, doc) => {
        const { amount, category } = doc.data();
        acc[category] = (acc[category] || 0) + amount; // 카테고리별로 합산
        return acc;
      }, {});

      setCategoriesData(categories);

      const totalExpenses = Object.values(categories).reduce((sum, expense) => sum + expense, 0); // 총 지출 계산

      // 파이 차트 데이터 변환
      const pieChartData = Object.keys(categories).map((category) => ({
        name: category,
        population: (categories[category] / totalExpenses) * 100, // 전체 대비 퍼센트 계산
        color:
          category === '음식'
            ? '#fa9696'
            : category === '교통'
            ? '#ffd300'
            : category === '쇼핑'
            ? '#88c8ff'
            : category === '기타'
            ? '#7cd06a'
            : category === '주거'
            ? '#d287ff'
            : category === '교육'
            ? '#ff00ff'
            : category === '경조사'
            ? '#00ff00'
            : category === '보험'
            ? '#00ffff'
            : '#e4b7ff', // 기본 색상
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }));

      setPieData(pieChartData);
    } catch (error) {
      console.error('오류:', error);
    }
  };

  const openModal = () => setIsModalVisible(true);

  // 모달에서 선택된 연도와 월 적용
  const applyPeriod = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setIsModalVisible(false);
  };

  // 모달 닫기
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      {/* 선택된 연도와 월 표시 */}
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
            isPieChartModal={true} // PieChart에 맞는 모달
          />
        )}
      </View>

      {/* 파이 차트 및 내역 영역 */}
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
            }}
            accessor="population"
            backgroundColor="transparent"
            absolute
          />
        </View>

        <View style={styles.legendContainer}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>
                {item.name} ({item.population.toFixed(2)}%)
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 카테고리별 지출 목록 */}
      <View style={styles.expenseListWrapper}>
        <ScrollView style={styles.expenseList}>
          {Object.entries(categoriesData)
            .sort((a, b) => b[1] - a[1]) // 지출 금액 기준 내림차순 정렬
            .map(([category, amount], index) => (
              <View key={index} style={styles.expenseItem}>
                <Text style={styles.expenseCategory}>{category}</Text>
                <Text style={styles.expenseAmount}>{amount.toLocaleString()} 원</Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20, paddingHorizontal: 20 },
  title: { fontSize: 20, color: '#000', fontWeight: '600' },
  dateButton: { backgroundColor: '#ddd', paddingVertical: 5, paddingHorizontal: 10, marginLeft: 10, borderRadius: 25 },
  dateButtonText: { color: '#000', fontSize: 14 },
  chartWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  chartContainer: { flex: 1 },
  legendContainer: { flexDirection: 'column', marginLeft: 0, width: 150 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  legendColorBox: { width: 15, height: 15, borderRadius: 50, marginRight: 10 },
  legendText: { fontSize: 13, color: '#333' },
  expenseListWrapper: { height: 260 },
  expenseList: { width: '100%', paddingHorizontal: 10 },
  expenseItem: { backgroundColor: '#eee', paddingHorizontal: 50, paddingVertical: 18, flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
  expenseCategory: { fontSize: 16, color: '#000' },
  expenseAmount: { fontSize: 16, color: '#000', fontWeight: 'bold' },
});

export default PieChartComponent;
