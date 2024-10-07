import { createServer, Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { Task } from '../types/Task';

// Define the type of the Task model
const TaskModel: ModelDefinition<Task> = Model.extend({});

export function setupMockAPI() {
  createServer({
    models: {
      task: TaskModel, // Use the defined TaskModel type
    },

    seeds(server) {
      server.create('task', { id: '1', text: 'Test Task 1', completed: false });
      server.create('task', {
        id: '2',
        text: 'Test Task 2',
        completed: true,
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/tasks', (schema) => {
        // Return all tasks from the schema
        return schema.all('task'); // Use "schema.all" to retrieve all tasks
      });

      this.post('/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('task', attrs); // Use "schema.create" to create a new task
      });
    },
  });
}
