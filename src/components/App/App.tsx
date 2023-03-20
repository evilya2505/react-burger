import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import data from '../../utils/data.json';

function App() {
  const ingredientsData = data.result;

  return (
    <div className="App">
      <AppHeader />
      <Main ingredients={ingredientsData} />
    </div>
  );
}

export default App;
