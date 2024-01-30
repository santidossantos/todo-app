import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'postgre',
  connector: 'postgresql',
  url: '',
  host: 'postgres',
  port: 5432,
  user: 'postgre',
  password: 'postgre',
  database: 'todo',
};

@lifeCycleObserver('datasource')
export class PostgreDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'postgre';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgre', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
