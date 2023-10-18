import cron from 'node-cron';
import { nanoid } from 'nanoid'

let isJobRunning = false
let jobSkippedCount = 0

const delay = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export const templateJob = cron.schedule(
    " */2 * * * * *",
    async () => {
        if (isJobRunning) {
            jobSkippedCount++
            console.log("__ JOB SKIPPED COUNT __ ", jobSkippedCount)
            if (jobSkippedCount > 2) {

                /* If a job takes more than 15 seconds 
                   to complete we can stop this job, 
                   throw a error and start a new job */

                console.log("__ TIMEOUT __")
                jobSkippedCount = 0
                isJobRunning = false

            }
            return
        }
        isJobRunning = true
        try {
            const id = nanoid(10)
            console.log("\n\n__ JOB RUNNING __ ", id, new Date())

            /* Your  functionality goes here 
          I have used a delay function to 
          simulate a long running job */

            await delay(16000)
            isJobRunning = false
            jobSkippedCount = 0
            console.log("__ JOB COMPLETED __ ", id, new Date())

        }
        catch (err) {
            console.error(err);
        }
    },
    {
        scheduled: false,
    }
);
