import { fireEvent, render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { Task } from '../types/Task';

jest.mock(
  '../components/TaskItem',
  () =>
    ({ task, onToggleComplete }: { task: Task; onToggleComplete: (id: string) => void }) => (
      <div>
        <label>
          <input type='checkbox' checked={task.completed} onChange={() => onToggleComplete(task.id)} />
          {task.text}
        </label>
      </div>
    ),
);

const mockTasks: Task[] = [
  { id: '1', text: 'Task 1', completed: false },
  { id: '2', text: 'Task 2', completed: true },
];

describe('TaskList Component', () => {
  it('renders the tasks correctly', () => {
    render(<TaskList tasks={mockTasks} onToggleComplete={jest.fn()} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it('calls onToggleComplete when a task is clicked', () => {
    const onToggleComplete = jest.fn();
    render(<TaskList tasks={mockTasks} onToggleComplete={onToggleComplete} />);

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(onToggleComplete).toHaveBeenCalledWith('1');
  });
});
