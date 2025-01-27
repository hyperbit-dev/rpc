import SchedulerService from '#services/scheduler_service'
import IndexBlocks from '#jobs/index_blocks'

// Create an instance of the scheduler service on server startup
const scheduler = new SchedulerService()

// Add all jobs which should be run while the server is up
scheduler.addJob({
  key: 'index-blocks',
  cronExpression: '* * * * *',
  // @ts-ignore
  job: IndexBlocks,
})

// update blockchain info
// update mempool info

// Actually start a scheduler for all jobs
scheduler.scheduleAllJobs()
