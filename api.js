const express = require("express");
const app = express();

app.get("/api/avatar", (req, res) => {
  const options = {
    mood: ["happy", "surprised"],
    top: ["shortHairDreads", "longHairStraight"],
    accessories: ["roundGlasses"],
  };

  const { mood, top, accessories } = req.query;
  if (mood) options.mood = mood.split(",");
  if (top) options.top = top.split(",");
  if (accessories) options.accessories = accessories.split(",");

  const baseUrl = "https://avatars.dicebear.com/api/";
  const queryParams = Object.entries(options)
    .map(
      ([key, value]) => `options[${key}][]=${value.join("&options[${key}][]=")}`
    )
    .join("&");

  const randomInt = Math.floor(Math.random() * 1000);
  const avatarUrl = `${baseUrl}${queryParams}&cache=${randomInt}`;

  res.json({ avatarUrl });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
