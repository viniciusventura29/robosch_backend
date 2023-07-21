const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const { run } = require("./wppConnect");
const port = 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin:["http://localhost:5173","http://localhost:5173/","*","https://chat-eight-omega.vercel.app/","https://chat-eight-omega.vercel.app","https://chat-robosch.vercel.app"]
}))

require("./routes/df-routes")(app);
require("./wppConnect")(run)

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
