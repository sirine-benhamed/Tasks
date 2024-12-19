import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // Tableau pour stocker les tâches

    // Méthode pour ajouter une tâche
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const newTask: Task = {
          id: uuid(),
          title,
          description,
          isCompleted: createTaskDto.isCompleted || false,  // Assurez-vous que c'est un booléen
          createdAt: new Date(),  // Utilisez la date actuelle si elle n'est pas fournie
        };
        this.tasks.push(newTask);
        return newTask;
      }
      
  
    // Méthode pour récupérer toutes les tâches
    getAllTasks(): Task[] {
      return this.tasks; // Retourner toutes les tâches
    }
  
    // Méthode pour marquer une tâche comme terminée
    completeTask(id: string): Task {
      const task = this.tasks.find(task => task.id === id);
      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      task.isCompleted = true;
      return task;
    }
  
    // Méthode pour supprimer une tâche
    deleteTask(id: string): boolean {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex === -1) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      this.tasks.splice(taskIndex, 1); // Supprimer la tâche du tableau
      return true;
    }
}