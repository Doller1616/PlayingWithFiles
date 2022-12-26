const Server = require('./server');
const DownloadFun = require('./Utils/downloadFun');
const { uploadFile } = DownloadFun;
const PORT = 5000;


Server.post('/uploadFile',uploadFile?.array('profiles', 4),(req, res)=> {
  const urls = req.files.map((obj)=> `http://localhost:${PORT}/${obj.filename}`) 
   res.send(urls)
})

Server.get("/type-1", (req, res, next) => {
  const file = DownloadFun.simpleDownloadLocalFile();
  res.sendFile(file, (err) => (err) && next(err));

})

Server.post("/type-2", async (req, res) => {
  // Check Token in express validator
  if(!req.body.id === 123 ) res.status(404).send({ msg : 'url not found!'});
  res.setHeader("Content-type", "image/jpg")
  const file = await DownloadFun.downloadFromRemoteLocationWithSecurity();
  res.send(file)
})

Server.get("/type-3", async (req, res) => {
  // Check Token in express validator
  const workbook = DownloadFun.downloadExcelFromDBOrObject();

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);

  workbook.xlsx.write(res).then(() => { res.status(200).send() });
})

Server.listen(PORT, () => {
  console.log(`Server Started on : http://localhost:${PORT}`)
})
