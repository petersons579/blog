import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ArticlesController } from './articles.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
