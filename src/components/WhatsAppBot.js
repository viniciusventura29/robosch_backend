import wppbot from "@wppconnect-team/wppconnect";

export default class WhatsAppBot {
  constructor(
    dialogInterpleter,
    config = {
      session: "session-name",
      catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
        console.log("Number of attempts to read the qrcode: ", attempts);
        console.log("Terminal qrcode: ", asciiQR);
        console.log("base64 image string qrcode: ", base64Qrimg);
        console.log("urlCode (data-ref): ", urlCode);
      },
      statusFind: (statusSession, session) => {
        console.log("Status Session: ", statusSession);
        console.log("Session name: ", session);
      },
      onLoadingScreen: (percent, message) => {
        console.log("LOADING_SCREEN", percent, message);
      },
      headless: false,
      disableWelcome: true,
      useChrome: true,
      debug: true,
      updatesLog: true,
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
        let response = await this.dialogInterpleter.run(
          message.from,
          message.body
        );

        await client.sendText(message.from, response);
      }
    });
  }
}