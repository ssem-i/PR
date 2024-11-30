import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Modal, Button, StyleSheet, FlatList } from 'react-native';
import GoalAddModal from './GoalAddModal.js';
import GoalDelModal from './GoalDelModal.js';
import BudgetBar from './BudgetBar.js';
import BudgetModal from './BudgetModal.js';
import * as Progress from 'react-native-progress';
const PlustButton = ({ onAddPress }) => {
  return(
    <TouchableOpacity
      style={styles.plustBtn}
      onPress={onAddPress}
      >
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}
const DelButton = ({ onDelPress }) => {
  return(
    <TouchableOpacity
      style={styles.delBtn}
      onPress={onDelPress}
      >
      <Text style={styles.text}>삭제</Text>
    </TouchableOpacity>
  );
}
function GoalHeader({onAddPress}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextView}>
        <Text style={styles.textTitle}>목표</Text>
      </View>
      <PlustButton onAddPress={onAddPress}/>
    </View>
  );
}
function GoalItem({ index, goal, dayLeft, insufAmount, onDelPress }) {
     return (
         <View style={styles.goalItem} >
           <Text style={styles.text} > {index} </Text>
           <Text style={styles.text} > {goal} </Text>
           <Text style={styles.text} > {dayLeft} 일</Text>
           <Text style={styles.text} > {insufAmount} 원</Text>
           <DelButton onDelPress={() => onDelPress(index)} />
         </View>
     );
}
function GoalList() {
  const [goalModalVisible, setGoalModalVisible] = useState(false); // 상태 관리
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(null); // 선택된 목표 인덱스
  const [goalData, setGoalData] = useState([
      { index: 1, goal: '내용', dayLeft: 10, insufAmount: '5000' },
      { index: 2, goal: "내용2", dayLeft: 5, insufAmount: '2000' },
      { index: 3, goal: "내용3", dayLeft: 7, insufAmount: '1000' },
    ]);
  const handlePlustBtnPress = () => {
    setGoalModalVisible(true);
  }
  const handleDelBtnPress = (index) => {
    console.log(`삭제선택: ${index}`);
    setSelectedGoalIndex(index); // 목표 인덱스를 설정
    setDelModalVisible(true);
  }
 const handleDeleteGoal = () => {
   console.log('삭제 버튼 클릭됨:', selectedGoalIndex);  // 삭제될 목표 인덱스 출력
   setGoalData((prevGoals) =>
     prevGoals.filter((goal) => goal.index !== selectedGoalIndex) // 삭제하려는 목표를 제외한 나머지를 상태로 업데이트
   );
   setDelModalVisible(false); // 삭제 후 모달 닫기
   setSelectedGoalIndex(null); // 선택된 목표 인덱스 초기화
 };
  const handleAddGoal = (newGoal) => {
    setGoalData((prevGoals) => [
      ...prevGoals,
      {
        index: prevGoals.length + 1,
        goal: newGoal.goal,
        dayLeft: newGoal.dayLeft,
        insufAmount: newGoal.amount,
        },
      ]);
      setGoalModalVisible(false); // 모달 닫기
  };
  return(
  <View>
    <GoalHeader onAddPress={handlePlustBtnPress}/>
    <FlatList
      style={styles.flatList}
      data={goalData}
      renderItem={({item}) => (
        <GoalItem
                  index={item.index}
                  goal={item.goal}
                  dayLeft={item.dayLeft}
                  insufAmount={item.insufAmount}
                  onDelPress={handleDelBtnPress}
                />
      )}
      keyExtractor={(item) => item.index.toString()}
    />
      {goalModalVisible && (
              <GoalAddModal
                visible={goalModalVisible}
                onClose={() => setGoalModalVisible(false)}
                onAddGoal={handleAddGoal}
              />
      )}
      {delModalVisible && (
        <GoalDelModal
          visible={delModalVisible}
          onClose={() => setDelModalVisible(false)}
          onConfirmDel={handleDeleteGoal}
        />
      )}
    </View>
  );
}
function BudgetView() {
  const [budgetModalVisible, setbudgetModalVisible] = useState(false); // 상태 관리
  return(
    <View>
      <View style={styles.budgetHeader}>
      <View style={styles.headerTextView}>
      <Text style={styles.textTitle}>예산</Text>
      </View>
        <TouchableOpacity style={styles.plustBtn} onPress={()=>setbudgetModalVisible(true)}
        >
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
        <BudgetBar/>
        {budgetModalVisible && (
                <BudgetModal
                  visible={budgetModalVisible}
                  onClose={() => setbudgetModalVisible(false)}
                />
        )}
    </View>
  );
}
export default function Goal() {
  return (
    <View style={styles.container}>
      <View style={styles.goalListView}>
      <GoalList/>
      <BudgetView/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  delBtn: {
      backgroundColor: '#dcc9ff',
      padding: 10,
      borderRadius: 30,
  },
  flatList: {
    margin: 20,
  },
  goalItem: {
    marginVertical: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: '#ccc',
    borderRadius: 30,
    backgroundColor: '#f3f3f3',
  },
  container: {
    backgroundColor: 'white',
    flex:1,
  },
  goalListView: {
    flex: 1,
  },
  headerContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerTextView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 30,
  },
  budgetHeader: {
    marginTop: 55,
    //backgroundColor: '#dcc9ff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  budgetText: {
    margin:10,
    color: 'black',
        fontSize: 14,
  },
  plustBtn: {
    marginHorizontal: 10,
    width: 30,
    height: 30,
    backgroundColor: '#dcc9ff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  textTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});