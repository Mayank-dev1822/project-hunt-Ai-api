import { Injectable } from '@nestjs/common';
import { TableClient } from '@azure/data-tables';
import { Project } from 'src/models/projects.model';

@Injectable()
export class DbService {
  private connectionString: string;
  public tableServiceClient: any;

  //Initializing table storage
  private async initializeTable(tableName: string) {
    //Saving environment variables
    this.connectionString = process.env.CONNECTION_STRING;
    //Creating table service client and table client
    this.tableServiceClient = TableClient.fromConnectionString(
      this.connectionString,
      tableName,
    );
  }

  /**
   * @returns all the items from the table
   */
  public async getAllProjects() {
    //Querying the database table
    const queryResult = await this.initializeTable(
      process.env.PROJECTS_TABLE_NAME,
    ).then(async () => {
      return await this.tableServiceClient.listEntities(
        process.env.PROJECTS_TABLE_NAME,
      );
    });

    //Saving all the entities from the query into an array.
    const entities = [];
    for await (const entity of queryResult) {
      //Creating a new project object as Project model.
      const projectModel = {
        projectId: entity.rowKey,
        projectTitle: entity.Project_Title,
        projectTechnologies: entity.Project_Technologies,
        technicalSkillSetBackend: entity.Technical_Skillset_Backend,
        technicalSkillSetFrontend: entity.Technical_Skillset_Frontend,
        technicalSkillSetDatabases: entity.Technical_Skillset_Databases,
        technicalSkillSetInfrastructure:
          entity.Technical_Skillset_Infrastructre,
      } as Project;

      //Pushing the project object to array
      entities.push(projectModel);
    }

    //Returning all the entities
    return entities;
  }

  /**
   * @param filters 
   * @returns filtered results
   */
  public async searchQueryFilter(filters: any) {
    //Fetching all the projects from DB
    const entities = await this.getAllProjects();
    const test = ['angular', 'php'];
    //Converting filters to lowercase to make the search case-independent
    const lowercaseFilters = filters.map((filter) => filter.toLowerCase());

    //Storing technical stack skills in an array
    const filteredProjects = entities.filter((project) => {
      const techSkills = [
        project.technicalSkillSetBackend,
        project.technicalSkillSetFrontend,
        project.technicalSkillSetDatabases,
        project.technicalSkillSetInfrastructure,
      ];

      /**
       * Checking if any of the tech stack contains the input filters
       * This also converts each skill in tech stack to lower case
       */
      return techSkills.some((skill) => {
        return skill && lowercaseFilters.some((filter) => skill.toLowerCase().includes(filter));
      });
    });

    return filteredProjects;
  }
}
