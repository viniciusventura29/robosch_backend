import dialogflow from "@google-cloud/dialogflow";

export default class DialogInterpreter {
  constructor(projectId, configPath, language = 'pt-BR') {
    this.client = new dialogflow.SessionsClient({ keyFilename: configPath });
    this.projectId = projectId;
    this.language = language;
  }

  async run(session, query) {
    const sessionPath = this.client.projectAgentSessionPath(this.projectId, session);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: this.language,
        },
      },
    };

    const responses = await this.client.detectIntent(request);
    (!result.intent) ? console.log('  No intent matched.') : null

    return responses[0].queryResult.fulfillmentText.replace(/\\n/g, "\n");
  }
}