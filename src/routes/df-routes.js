const chatbot = require('../chatbot/chatbot')

module.exports = app =>{
    app.post("/", async (request,response)=>{
        const { text, userId } = request.body;
        const resultQuery = await chatbot.textQuery(text, userId)
        const answersObjects = {
            actionName: resultQuery[0].queryResult.action,
            userQuery: resultQuery[0].queryResult.queryText,
            fulfillmentText: resultQuery[0].queryResult.fulfillmentText
        }
        console.log(answersObjects.fulfillmentText)
        return response.send(answersObjects.fulfillmentText)
    })
}