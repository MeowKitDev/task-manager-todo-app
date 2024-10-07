import { Tabs } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { setupMockAPI } from './api/mockApi';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/Task';

setupMockAPI();

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  useEffect(() => {
    axios.get('/api/tasks').then((response) => setTasks(response.data.tasks));
  }, []);

  const addTask = (text: string) => {
    const newTask = { text, completed: false };
    axios.post('/api/tasks', newTask).then((response) => {
      setTasks([...tasks, response.data.task]);
    });
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className='container'>
      <h2>Task Manager - Todo App</h2>
      <TaskForm onAddTask={addTask} />
      <Tabs defaultActiveKey='all' onChange={(key) => setFilter(key as 'all' | 'completed' | 'incomplete')}>
        <Tabs.TabPane tab='All' key='all' />
        <Tabs.TabPane tab='Completed' key='completed' />
        <Tabs.TabPane tab='Incomplete' key='incomplete' />
      </Tabs>
      <TaskList tasks={filteredTasks} onToggleComplete={toggleComplete} />
    </div>
  );
};

export default App;
