import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const MonthlyBudgetBar = ({ budget , spent }) => {
  const remaining = budget - spent;
  const progress = remaining / budget;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>남은 예산(월별)</Text>
      <Text style={styles.amountText}>{remaining.toLocaleString()}원</Text>
      <Progress.Bar
        progress={progress}
        width={null}
        height={12}
        color="#000"
        unfilledColor="#bbb"
        borderRadius={6}
        borderWidth={0}
        style={styles.progressBar}
      />
    </View>
  );
};
const DayBudgetBar = ({ budget, spent }) => {
  const remaining = budget - spent;
  const progress = remaining / budget;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>남은 예산(월별)</Text>
      <Text style={styles.amountText}>{remaining.toLocaleString()}원</Text>
      <Progress.Bar
        progress={progress}
        width={null}
        height={12}
        color="#000"
        unfilledColor="#bbb"
        borderRadius={6}
        borderWidth={0}
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

