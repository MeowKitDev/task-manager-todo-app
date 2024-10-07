import { List } from 'antd';
import React from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';

export interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  return (
    <List dataSource={tasks} renderItem={(task) => <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} />} />
  );
};

export default TaskList;
