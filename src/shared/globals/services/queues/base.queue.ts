import Queue, { Job } from 'bull';
import Logger from 'bunyan';
import { ExpressAdapter, createBullBoard, BullAdapter } from '@bull-board/express';
import { config } from '@configs/configEnvs';
import { logger } from '@configs/configLogs';
import { IAuthJob } from '@auth/interfaces/authJob.interface';
import { IEmailJob } from '@user/interfaces/emailJob.interface';
import { IUserJob } from '@user/interfaces/userJob.interface';

type IBaseJobData = IAuthJob | IEmailJob | IUserJob;

let bullAdapters: BullAdapter[] = [];

export let serverAdapter: ExpressAdapter;

export abstract class BaseQueue {
  queue: Queue.Queue;
  log: Logger;

  constructor(queueName: string) {
    this.queue = new Queue(queueName, `${config.REDIS_HOST}`);
    bullAdapters.push(new BullAdapter(this.queue));
    bullAdapters = [...new Set(bullAdapters)];
    serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queues');

    createBullBoard({
      queues: bullAdapters,
      serverAdapter
    });

    this.log = logger.createLogger(`${queueName}Queue`);
  }
}

