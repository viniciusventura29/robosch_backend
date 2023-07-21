const venom = require('venom-bot');

const { default: axios } = require("axios");

module.exports = run => {
    venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
    client.onMessage((message) => {
        axios.post("http://localhost:4000/", {
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