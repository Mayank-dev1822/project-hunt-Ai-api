# Project Hunt AI
Using the power of AI to find the best fit idea for your next project.

## Installation

```bash
$ npm install
```

## Running the app

- Add all the following required variables in a .env file
```env
AZURE_ACCOUNT_NAME = Azure storage account name.
AZURE_ACCOUNT_KEY = Azure storage account key.
CONNECTION_STRING = Storage connection string from Azure storage.
TABLE_ENDPOINT_URI = Azure table endpoint uri.
PROJECTS_TABLE_NAME = Name of the Azure table to store projects.
OPENAI_API_KEY = OpenAI API key to call their models.
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
