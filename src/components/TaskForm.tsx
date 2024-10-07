import { Button, Form, Input, message } from 'antd';
import React from 'react';

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { task: string }) => {
    if (values.task.trim() === '') {
      message.error('Task cannot be empty.');
      return;
    }
    onAddTask(values.task);
    form.resetFields(); // Reset the form after submission
  };

  return (
    <Form form={form} layout='inline' onFinish={handleSubmit}>
      <Form.Item name='task' rules={[{ required: true, message: 'Please enter a task!' }]}>
        <Input placeholder='Enter a task' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
