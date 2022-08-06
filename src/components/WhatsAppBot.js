import wppbot from "@wppconnect-team/wppconnect";

export default class WhatsAppBot {
    constructor(
        dialogInterpleter,
        config = {
            session: 'session-name',
            headless: true,
            multidevice: true
        }
    ) {
        wppbot
            .create(config)
            .then((client) => this.start(client))
            .catch((erro) => {
                console.log(erro);
            });

        this.dialogInterpleter = dialogInterpleter;
    }

    async start(client) {
        client.onMessage(async (message) => {
            console.log("Eu Recebi uma mensagem");
            if (message.type === "chat" && message.isGroupMsg === false) {
                let response = await this.dialogInterpleter.run(message.from, message.body);

                await client.sendText(message.from, response)
            }
        });
    }
}