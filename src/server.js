const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/df-routes")(app);

const wppconnect = require("@wppconnect-team/wppconnect");
const { default: axios } = require("axios");

wppconnect
  .create({
    session: "sessionName", //Pass the name of the client you want to start the bot
    catchQR: (asciiQR) => {
      // console.log("Terminal qrcode: ", asciiQR);
    },
    statusFind: (statusSession) => {
      console.log("Status Session: ", statusSession);
    },
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    axios.post("http://localhost:3000/",{
      text: message.body,
      userId: message.sender.id
    }).then((res)=>{
      console.log(res.data)
      client
      .sendText(message.sender.id, res.data)
      .catch((erro) => {
        console.error('Error when sending: ', erro);
      });
     
    })
  });
}

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
