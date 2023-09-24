import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly dbService: DbService,
    private projectService: ProjectsService,
  ) {}

  //Gets all the data from the projects db.
  @Get('/get-all')
  async HandleGetAllProjects() {
    const GetAllProjectsResponse = await this.dbService.getAllProjects();
    return GetAllProjectsResponse;
  }

  @Get('/search')
  async HandleProjectSearch(@Query('filterOptions') filterOptions: any) {
    const decodedValues = JSON.parse(decodeURIComponent(filterOptions));
    const SearchProjectResponse =
      await this.dbService.searchQueryFilter(decodedValues);
    return SearchProjectResponse;
  }

  @Post('/get-keywords')
  async HandleSearchKeywords(@Body() searchQuery: object) {
    const SearchProjectResponse = await this.projectService.getKeywords(searchQuery);
    //const SearchProjectResponse = ['php'];
    return { keywords: SearchProjectResponse };
  }
}
