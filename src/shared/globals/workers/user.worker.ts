import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';

const log: Logger = logger.createLogger('userWorker');

class UserWorker {
  async addUserToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      // process pending
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
}

export const userWorker: UserWorker = new UserWorker();
