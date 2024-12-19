import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [Task])
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Mutation(() => Task)
  async createTask(@Args('createTaskDto') createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Mutation(() => Task)
async completeTask(@Args('id') id: string): Promise<Task> {
  const task = await this.tasksService.completeTask(id);
  return task; 
}


  @Mutation(() => String)
  async deleteTask(@Args('id') id: string): Promise<string> {
    try {
      await this.tasksService.deleteTask(id);
      return `Task with ID "${id}" successfully deleted`;
    } catch (error) {
      throw new Error(`Failed to delete task with ID "${id}". ${error.message}`);
    }
  }
  
  
}
