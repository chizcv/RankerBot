/*INSERT GROUP ID AND COOKIE BELOW*/
require('dotenv').config();

var groupId = process.env.GROUPID // << Replace 12345 with your Group Id
var Scookie = process.env.ROBLOX_COOKIE // << Put your account cookie inside of the quotes

/*INSERT GROUP ID AND COOKIE ABOVE*/


const express = require("express");
const bloxy = require("bloxy");
const app = express();

const client = new bloxy.Client({
  credentials: {
      cookie: Scookie
  }
});

app.use(express.static("public"));

async function startApp() {
  await client.login();
  console.log("Sucessfully Logged In!");
}
startApp();

app.get("/ranker", (req, res) => {
    const group = client.getGroup(groupId);

    var User = req.param("userid");
    var Rank = req.param("rank");

    group.updateMember(parseInt(User), parseInt(Rank))
    res.json("Ranked!");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});