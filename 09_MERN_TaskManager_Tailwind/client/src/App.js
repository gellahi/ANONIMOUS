import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
