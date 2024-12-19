import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  constructor(private apollo: Apollo) {}

  getAllTasks(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllTasks {
            id
            title
            description
            isCompleted
            createdAt
          }
        }
      `,
    }).valueChanges;
  }

  createTask(title: string, description: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($createTaskDto: CreateTaskDto!) {
          createTask(createTaskDto: $createTaskDto) {
            id
            title
            description
            isCompleted
            createdAt
          }
        }
      `,
      variables: { createTaskDto: { title, description } },
    });
  }

  completeTask(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: String!) {
          completeTask(id: $id) {
            id
            title
            isCompleted
          }
        }
      `,
      variables: { id },
    });
  }

  deleteTask(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: String!) {
          deleteTask(id: $id)
        }
      `,
      variables: { id },
    });
  }
}
