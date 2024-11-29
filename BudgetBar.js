import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const MonthlyBudgetBar = ({ budget , spent }) => {
  const remaining = budget - spent; // 남은 예산 계산
  const progress = remaining / budget; // 남은 비율 계산
  return (
    <View style={styles.container}>
      <Text style={styles.text}>남은 예산(월별)</Text>
      <Text style={styles.amountText}>{remaining.toLocaleString()}원</Text>
      <Progress.Bar
        progress={progress} // 남은 비율
        width={null} // 전체 너비
        height={12}
        color="#000" // 진행 부분 색상
        unfilledColor="#bbb" // 남은 부분 색상
        borderRadius={6}
        borderWidth={0} // 외곽선 제거
        style={styles.progressBar}
      />
    </View>
  );
};
const DayBudgetBar = ({ budget, spent }) => {
  const remaining = budget - spent; // 남은 예산 계산
  const progress = remaining / budget; // 남은 비율 계산
  return (
    <View style={styles.container}>
      <Text style={styles.text}>남은 예산(월별)</Text>
      <Text style={styles.amountText}>{remaining.toLocaleString()}원</Text>
      <Progress.Bar
        progress={progress} // 남은 비율
        width={null} // 전체 너비 (부모 컨테이너
        height={12}
        color="#000" // 진행 부분 색상
        unfilledColor="#bbb" // 남은 부분 색상
        borderRadius={6}
        borderWidth={0} // 외곽선 제거
        style={styles.progressBar}
      />
    </View>
  );
};
export default function BarView() {
    const monthlyData = { budget: 900000, spent: 300000 };
     const dayData = { budget: 500000, spent: 100000 };

  return(
    <View>
    <MonthlyBudgetBar
      budget={monthlyData.budget} spent={monthlyData.spent}
    />
    <DayBudgetBar budget={dayData.budget} spent={monthlyData.spent}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  progressBar: {
    marginTop: 8,
  },
  text: {
      color: 'black',
      fontSize: 14,
    },
    amountText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    }
});

