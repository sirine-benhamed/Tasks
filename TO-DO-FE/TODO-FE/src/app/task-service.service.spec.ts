import { TestBed } from '@angular/core/testing';

import { TaskServices } from './task-service.service';

describe('TaskServiceService', () => {
  let service: TaskServices ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
