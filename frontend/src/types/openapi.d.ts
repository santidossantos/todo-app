import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig
} from 'openapi-client-axios'

/**
 * loopback.Count
 */
export interface LoopbackCount {
  count?: number
}
/**
 * NewTask
 * (tsType: Omit<Task, 'id'>, schemaOptions: { title: 'NewTask', exclude: [ 'id' ] })
 */
export interface NewTask {
  description: string
  tags?: string[]
  active: boolean
}
/**
 * Task
 */
export interface Task {
  id?: number
  description: string
  tags?: string[]
  active: boolean
}
/**
 * Task.Filter
 */
export interface TaskFilter {
  offset?: number
  /**
   * example:
   * 100
   */
  limit?: number
  skip?: number
  order?: string | string[]
  /**
   * Task.Fields
   */
  fields?: /* Task.Fields */
    | {
        id?: boolean
        description?: boolean
        tags?: boolean
        active?: boolean
      }
    | ('id' | 'description' | 'tags' | 'active')[]
}
/**
 * Task.Filter
 */
export interface TaskFilter1 {
  offset?: number
  /**
   * example:
   * 100
   */
  limit?: number
  skip?: number
  order?: string | string[]
  /**
   * Task.WhereFilter
   */
  where?: {
    [name: string]: any
  }
  /**
   * Task.Fields
   */
  fields?: /* Task.Fields */
    | {
        id?: boolean
        description?: boolean
        tags?: boolean
        active?: boolean
      }
    | ('id' | 'description' | 'tags' | 'active')[]
}
/**
 * TaskPartial
 * (tsType: Partial<Task>, schemaOptions: { partial: true })
 */
export interface TaskPartial {
  id?: number
  description?: string
  tags?: string[]
  active?: boolean
}
/**
 * TaskWithRelations
 * (tsType: TaskWithRelations, schemaOptions: { includeRelations: true })
 */
export interface TaskWithRelations {
  id?: number
  description: string
  tags?: string[]
  active: boolean
}

declare namespace Paths {
  namespace TaskControllerCount {
    namespace Parameters {
      /**
       * Task.WhereFilter
       */
      export interface Where {
        [name: string]: any
      }
    }
    export interface QueryParameters {
      where?: /* Task.WhereFilter */ Parameters.Where
    }
    namespace Responses {
      export type $200 = /* loopback.Count */ Components.Schemas.LoopbackCount
    }
  }
  namespace TaskControllerCreate {
    export type RequestBody =
      /**
       * NewTask
       * (tsType: Omit<Task, 'id'>, schemaOptions: { title: 'NewTask', exclude: [ 'id' ] })
       */
      Components.Schemas.NewTask
    namespace Responses {
      export type $200 = /* Task */ Components.Schemas.Task
    }
  }
  namespace TaskControllerDeleteById {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      /**
       * Task DELETE success
       */
      export type $204 = any
    }
  }
  namespace TaskControllerFind {
    namespace Parameters {
      export type Filter = /* Task.Filter */ Components.Schemas.TaskFilter1
    }
    export interface QueryParameters {
      filter?: Parameters.Filter
    }
    namespace Responses {
      export type $200 =
        /**
         * TaskWithRelations
         * (tsType: TaskWithRelations, schemaOptions: { includeRelations: true })
         */
        Components.Schemas.TaskWithRelations[]
    }
  }
  namespace TaskControllerFindById {
    namespace Parameters {
      export type Filter = /* Task.Filter */ Components.Schemas.TaskFilter
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export interface QueryParameters {
      filter?: Parameters.Filter
    }
    namespace Responses {
      export type $200 =
        /**
         * TaskWithRelations
         * (tsType: TaskWithRelations, schemaOptions: { includeRelations: true })
         */
        Components.Schemas.TaskWithRelations
    }
  }
  namespace TaskControllerReplaceById {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = /* Task */ Components.Schemas.Task
    namespace Responses {
      /**
       * Task PUT success
       */
      export type $204 = any
    }
  }
  namespace TaskControllerUpdateAll {
    namespace Parameters {
      /**
       * Task.WhereFilter
       */
      export interface Where {
        [name: string]: any
      }
    }
    export interface QueryParameters {
      where?: /* Task.WhereFilter */ Parameters.Where
    }
    export type RequestBody =
      /**
       * TaskPartial
       * (tsType: Partial<Task>, schemaOptions: { partial: true })
       */
      Components.Schemas.TaskPartial
    namespace Responses {
      export type $200 = /* loopback.Count */ Components.Schemas.LoopbackCount
    }
  }
  namespace TaskControllerUpdateById {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody =
      /**
       * TaskPartial
       * (tsType: Partial<Task>, schemaOptions: { partial: true })
       */
      Components.Schemas.TaskPartial
    namespace Responses {
      /**
       * Task PATCH success
       */
      export type $204 = any
    }
  }
}

export interface OperationMethods {
  /**
   * TaskController.count
   */
  'TaskController.count'(
    parameters?: Parameters<Paths.TaskControllerCount.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TaskControllerCount.Responses.$200>
  /**
   * TaskController.findById
   */
  'TaskController.findById'(
    parameters?: Parameters<
      Paths.TaskControllerFindById.PathParameters & Paths.TaskControllerFindById.QueryParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TaskControllerFindById.Responses.$200>
  /**
   * TaskController.replaceById
   */
  'TaskController.replaceById'(
    parameters?: Parameters<Paths.TaskControllerReplaceById.PathParameters> | null,
    data?: Paths.TaskControllerReplaceById.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TaskControllerReplaceById.Responses.$204>
  /**
   * TaskController.updateById
   */
  'TaskController.updateById'(
    parameters?: Parameters<Paths.TaskControllerUpdateById.PathParameters> | null,
    data?: Paths.TaskControllerUpdateById.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TaskControllerUpdateById.Responses.$204>
  /**
   * TaskController.deleteById
   */
  'TaskController.deleteById'(
    parameters?: Parameters<Paths.TaskControllerDeleteById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TaskControllerDeleteById.Responses.$204>
  /**
   * TaskController.find
   */
  'TaskController.find'(
    parameters?: Parameters<Paths.TaskControllerFind.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TaskControllerFind.Responses.$200>
  /**
   * TaskController.create
   */
  'TaskController.create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TaskControllerCreate.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TaskControllerCreate.Responses.$200>
  /**
   * TaskController.updateAll
   */
  'TaskController.updateAll'(
    parameters?: Parameters<Paths.TaskControllerUpdateAll.QueryParameters> | null,
    data?: Paths.TaskControllerUpdateAll.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.TaskControllerUpdateAll.Responses.$200>
}

export interface PathsDictionary {
  ['/tasks/count']: {
    /**
     * TaskController.count
     */
    'get'(
      parameters?: Parameters<Paths.TaskControllerCount.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TaskControllerCount.Responses.$200>
  }
  ['/tasks/{id}']: {
    /**
     * TaskController.replaceById
     */
    'put'(
      parameters?: Parameters<Paths.TaskControllerReplaceById.PathParameters> | null,
      data?: Paths.TaskControllerReplaceById.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TaskControllerReplaceById.Responses.$204>
    /**
     * TaskController.updateById
     */
    'patch'(
      parameters?: Parameters<Paths.TaskControllerUpdateById.PathParameters> | null,
      data?: Paths.TaskControllerUpdateById.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TaskControllerUpdateById.Responses.$204>
    /**
     * TaskController.findById
     */
    'get'(
      parameters?: Parameters<
        Paths.TaskControllerFindById.PathParameters & Paths.TaskControllerFindById.QueryParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TaskControllerFindById.Responses.$200>
    /**
     * TaskController.deleteById
     */
    'delete'(
      parameters?: Parameters<Paths.TaskControllerDeleteById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TaskControllerDeleteById.Responses.$204>
  }
  ['/tasks']: {
    /**
     * TaskController.create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TaskControllerCreate.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TaskControllerCreate.Responses.$200>
    /**
     * TaskController.updateAll
     */
    'patch'(
      parameters?: Parameters<Paths.TaskControllerUpdateAll.QueryParameters> | null,
      data?: Paths.TaskControllerUpdateAll.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TaskControllerUpdateAll.Responses.$200>
    /**
     * TaskController.find
     */
    'get'(
      parameters?: Parameters<Paths.TaskControllerFind.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.TaskControllerFind.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
