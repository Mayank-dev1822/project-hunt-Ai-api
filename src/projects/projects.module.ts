import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProjectsController } from './projects.controller';

@Module({
    providers: [ DbService],
    controllers: [ProjectsController],
})
export class ProjectsModule {}
