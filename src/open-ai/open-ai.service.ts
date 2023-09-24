import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: any;

  public async openAI(prompt: string) {
    //Configuring OpenAI
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const insightsResponse = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an awesome tech person, who is expert in finding tech stack keywords from user inputs',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      //Cleaning the JSON response from OpenAI as sometimes OpenAI adds extra text like sure! or certainly!.
      const response = insightsResponse.choices[0].message.content;
      const elementsArray = response.split(',').map((element) => element.trim());
      return elementsArray;
    } catch (error) {
      console.log(error);

      return { status: 204 };
    }
  }
}
