import React from 'react';
import TodoApp from './components/TodoApp';
import Navbar from './components/Navbar';
import TodosProvider from './context/TodosContext';
import ThemeProvider from './context/ThemeContext';

function App() {
  return (
    <div>
      <ThemeProvider>
        <TodosProvider>
          <Navbar />
          <TodoApp />
        </TodosProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
