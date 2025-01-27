import { Job } from 'adonisjs-jobs'

export interface JobConfig {
  key: string
  cronExpression: string
  job: Job
}
