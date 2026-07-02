import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomizationModule } from './customization/customization.module';

@Module({
  imports: [CustomizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
