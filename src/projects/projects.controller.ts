import { Controller, Get, Query } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly dbService: DbService) {}

  //Gets all the data from the projects db.
  @Get('/get-all')
  async HandleGetAllProjects() {
    const GetAllProjectsResponse = await this.dbService.getAllProjects();
    return GetAllProjectsResponse;
  }

  @Get('/search')
  async HandleProjectSearch(@Query('filterOptions')  filterOptions: any) {
    const decodedValues = JSON.parse(decodeURIComponent(filterOptions));
    const SearchProjectResponse = await this.dbService.searchQueryFilter(decodedValues);
    return SearchProjectResponse;   
  }
}
