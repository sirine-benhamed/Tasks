import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskServices } from '../task-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  taskForm: FormGroup;
  errorMessage: string | null = null;  // Ajout d'une variable pour afficher les erreurs

  constructor(private taskService: TaskServices, private fb: FormBuilder) {
    // Initialisation du formulaire réactif
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (response: any) => {
        this.tasks = response.data.getAllTasks;
        this.errorMessage = null;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches', error);
        this.errorMessage = 'Erreur lors de la récupération des tâches. Veuillez réessayer plus tard.';
      }
    );
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const { title, description } = this.taskForm.value;
      this.taskService.createTask(title, description).subscribe(
        (response: any) => {
          this.tasks.push(response.data.createTask);  // Ajoutez la nouvelle tâche directement
          this.taskForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l’ajout de la tâche', error);
          this.errorMessage = 'Erreur lors de l’ajout de la tâche. Veuillez réessayer.';
        }
      );
    } else {
      this.errorMessage = 'Le titre de la tâche est requis.';
    }
  }

  completeTask(id: string): void {
    this.taskService.completeTask(id).subscribe(
      () => this.fetchTasks(),
      (error) => {
        console.error('Erreur lors de la complétion de la tâche', error);
        this.errorMessage = 'Erreur lors de la mise à jour de la tâche. Veuillez réessayer.';
      }
    );
  }

  deleteTask(id: string): void {
    if (!id) {
      alert("ID de la tâche invalide.");
      return;
    }

    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== id);  // Supprimez directement la tâche
      },
      (error) => {
        console.error('Erreur lors de la suppression de la tâche', error);
        alert(`Erreur lors de la suppression de la tâche avec l'ID "${id}".`);
      }
    );
  }

}
