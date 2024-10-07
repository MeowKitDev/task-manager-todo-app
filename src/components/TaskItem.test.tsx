import { fireEvent, render, screen } from '@testing-library/react';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';

const mockTask = {
  id: '1',
  text: 'Test Task',
  completed: false,
};

describe('TaskItem Component', () => {
  it('renders the task correctly', () => {
    render(<TaskItem task={mockTask} onToggleComplete={jest.fn()} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onToggleComplete when checkbox is clicked', () => {
    const onToggleComplete = jest.fn();
    render(<TaskItem task={mockTask} onToggleComplete={onToggleComplete} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onToggleComplete).toHaveBeenCalledWith('1');
  });

  it('renders the checkbox as checked if the task is completed', () => {
    const completedTask: Task = { ...mockTask, completed: true };
    render(<TaskItem task={completedTask} onToggleComplete={jest.fn()} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
