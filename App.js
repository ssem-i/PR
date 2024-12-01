import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import MainScreen from './MainScreen';
import TabBar from './TabBar';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('LoginScreen');
  const [users, setUsers] = useState([
    { email: 'test@test.com', password: '123456' },
    { email: 'user@example.com', password: 'password' },
  ]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <>
      {activeScreen === 'LoginScreen' && (
        <LoginScreen users={users} setActiveScreen={setActiveScreen} />
      )}
      {activeScreen === 'SignUpScreen' && (
        <SignUpScreen users={users} addUser={addUser} setActiveScreen={setActiveScreen} />
      )}
      {activeScreen === 'TabBar' && <TabBar />}
    </>
  );
};



export default App;