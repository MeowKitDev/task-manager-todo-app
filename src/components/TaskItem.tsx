import { Checkbox, List } from 'antd';
import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete }) => {
  return (
    <List.Item>
      <Checkbox checked={task.completed} onChange={() => onToggleComplete(task.id)}>
        {task.text}
      </Checkbox>
    </List.Item>
  );
};

export default TaskItem;
