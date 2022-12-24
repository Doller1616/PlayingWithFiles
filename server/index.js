const Express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const app = Express();
app.use(cors());
app.use(Express.json());
const PORT = 5000;

app.get("/type-1", (req, res) => {
  res.sendFile('marksheets/10thmarksheet.jpg', { root: path.join(__dirname) }, (err) => {
    (err) && next(err);
    console.log('Sent');
  });

})

app.post("/type-2", async (req, res) => {
  if(!req.body.id === 123 ) res.status(404).send({ msg : 'url not found!'});
  const url = 'https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772243_960_720.jpg';
  res.setHeader("Content-type", "image/jpg")
  const img = await axios.get(url, { responseType: 'arraybuffer' })
  res.send(img.data)
})

app.listen(PORT, () => {
  console.log();
  console.log(`Server Started on : http://localhost:${PORT}`)
})
