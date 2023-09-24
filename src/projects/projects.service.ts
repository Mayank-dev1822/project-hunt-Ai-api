import { Injectable, Inject } from '@nestjs/common';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import Prompts from '../../config/prompts/prompts.json';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(OpenAiService)
    private openAiService: OpenAiService,
  ) {}

  public async getKeywords(searchQuery: any) {
    //Replacing ${content} template literal with ocr text received in the request.
    const prompt = Prompts.search.replace(
        '${userQuery}',
        JSON.stringify(searchQuery.searchQuery),
      );

    //Getting response from OpenAI service
    const openAiResponse = await this.openAiService.openAI(prompt);
    return openAiResponse;
  }
}
