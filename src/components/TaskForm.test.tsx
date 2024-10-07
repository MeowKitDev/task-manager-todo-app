import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  it('should not submit an empty task', () => {
    const onAddTask = jest.fn();
    render(<TaskForm onAddTask={onAddTask} />);

    fireEvent.submit(screen.getByText('Add Task'));

    // The form should show an error when trying to submit an empty task
    expect(screen.getByText('Please enter a task!')).toBeInTheDocument();
    expect(onAddTask).not.toHaveBeenCalled();
  });

  it('should call onAddTask with the input value', () => {
    const onAddTask = jest.fn();
    render(<TaskForm onAddTask={onAddTask} />);

    // Enter task into the input field
    fireEvent.change(screen.getByPlaceholderText('Enter a task'), {
      target: { value: 'New Task' },
    });

    fireEvent.submit(screen.getByText('Add Task'));

    // onAddTask should be called with "New Task"
    expect(onAddTask).toHaveBeenCalledWith('New Task');

    // The input field should be cleared after submission
    expect(screen.getByPlaceholderText('Enter a task')).toHaveValue('');
  });
});
