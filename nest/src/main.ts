import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TemporalServer } from './temporal/server-temporal';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: new TemporalServer({
      workerOptions: {
        workflowsPath: require.resolve('./calculator/workflows'),
        taskQueue: 'CALCULATOR_TASK_QUEUE'
      }
    })
  })
  await app.startAllMicroservices()
  await app.listen(3001);
}

try {
  bootstrap();
} catch (err) {
  console.log(err);
  process.exit(1);
}
