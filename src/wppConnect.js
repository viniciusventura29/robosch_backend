const { executablePath } = require('puppeteer');

const wppconnect = require("@wppconnect-team/wppconnect");
const { default: axios } = require("axios");

module.exports = run => {
    wppconnect
        .create({
            session: "sessionName", //Pass the name of the client you want to start the bot
            catchQR: (asciiQR) => {
                // console.log("Terminal qrcode: ", asciiQR);
            },
            statusFind: (statusSession) => {
                console.log("Status Session: ", statusSession);
            },
            puppeteerOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: executablePath()
            },

        })
        .then((client) => start(client))
        .catch((error) => console.log(error));

    function start(client) {
        client.onMessage((message) => {
            axios.post("http://localhost:3000/", {
                text: message.body,
                userId: message.sender.id
            }).then((res) => {
                console.log(res.data)
                client
                    .sendText(message.sender.id, res.data)
                    .catch((erro) => {
                        console.error('Error when sending: ', erro);
                    });

            })
        });
    }
}