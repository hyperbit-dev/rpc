import { CronJob } from 'cron'
import logger from '@adonisjs/core/services/logger'
import { JobConfig } from '#types/jobs'
import redis from '@adonisjs/redis/services/main'

export default class SchedulerService {
  private jobs: JobConfig[] = []

  addJob(jobConfig: JobConfig) {
    this.jobs.push(jobConfig)
  }

  scheduleSingleJob(jobConfig: JobConfig) {
    const cronJob = new CronJob(jobConfig.cronExpression, async () => {
      try {
        if (jobConfig.key === 'index-blocks') {
          const latestJobId = await redis.get('bull:default:id')
          const job = await redis.hgetall(`bull:default:${latestJobId}`)
          if (job.finishedOn) {
            // @ts-ignore
            jobConfig.job.dispatch({
              attempts: 1,
              removeOnComplete: true,
              removeOnFail: true,
              keepLogs: 10,
            })
          }
        }
      } catch (e) {
        logger.error(`[Scheduler] - An error occurred during the execution of job ${jobConfig.key}`)
      }
    })

    cronJob.start()
  }

  scheduleAllJobs() {
    this.jobs.forEach((jobConfig) => {
      this.scheduleSingleJob(jobConfig)
    })
    logger.info(
      `[Scheduler] - ${this.jobs.length} registered ${this.jobs.length === 1 ? 'job has' : 'jobs have'} been scheduled`
    )
  }
}
