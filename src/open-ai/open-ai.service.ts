import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: any;

  async openAI(prompt: string) {
    //Configuring OpenAI
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
    });

    try {
      const insightsResponse = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an awesome tech person, expert in finding tech stack keywords from user inputs',
          },
          { role: 'user', content: prompt },
        ],
      });

      //Cleaning the JSON response from OpenAI as sometimes OpenAI adds extra text like sure! or certainly!.
      let cleanJson = insightsResponse.data.choices[0].message.content;
      cleanJson = cleanJson.substring(cleanJson.indexOf('[') + 0);
      const response = JSON.parse(cleanJson);
      return response;
    } catch (error) {
      //If error generating response from OpenAI, retry two times to get a response. Throw error in third attempt
      let i = 0;
      while (i < 2) {
        await this.openAI(prompt);
        i++;
      }
      return { status: 204 };
    }
  }
}
