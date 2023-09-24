import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { OpenAiService } from 'src/open-ai/open-ai.service';

@Module({
    providers: [ DbService, ProjectsService, OpenAiService],
    controllers: [ProjectsController],
})
export class ProjectsModule {}
