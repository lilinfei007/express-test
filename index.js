const express = require('express');
const cors = require('cors');
const app = express();
const fs = require("fs");
const path = require("path");
const { getUUID } = require("./utils.js")
// const w1 = fs.createWriteStream(path.join(__dirname,"./list.json"));
app.use(express.json())
app.use(cors({
  origin:"http://127.0.0.1:5173",
  credentials:true
}))
app.get("/list",(req,res) => {
  let data = fs.readFileSync(path.join(__dirname,"./list.json"),'utf-8');
  res.json({
    status:0,
    data:JSON.parse(data)
  })
});
app.post("/add",(req,res) => {
  if(!req.body.name) return res.status(200).send({status:1,message:"待办名称不能为空"});
  if(!req.body.description) return res.status(200).send({status:1,message:"待办详情不能为空"});
  if(!req.body.time) return res.status(200).send({status:1,message:"待办时间不能为空"});
  let { name,description,time } = req.body;
  let data = {
    id:getUUID(),
    name,
    description,
    time,
    status:0
  }
  let fileData = fs.readFileSync(path.join(__dirname,"./list.json"),'utf-8');
  fileData = JSON.parse(fileData);
  fileData.push(data);
  fs.writeFileSync(path.join(__dirname,"./list.json"),JSON.stringify(fileData));
  res.status(200).send({status:0,message:"添加成功"});
})
app.use((err,req,res,next) => {
  res.status(200).send({status:1,message:err.message});
})
app.listen(3000);