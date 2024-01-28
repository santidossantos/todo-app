import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgreDataSource} from '../datasources';
import {Task, TaskRelations} from '../models';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
> {
  constructor(
    @inject('datasources.postgre') dataSource: PostgreDataSource,
  ) {
    super(Task, dataSource);
  }
}
