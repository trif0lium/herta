import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { CalculatorModule } from './calculator/calculator.module';

@Module({
  imports: [SearchModule, CalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
