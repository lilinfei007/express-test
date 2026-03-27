const fs = require("fs");
const r1= fs.createReadStream("./1.txt");
const chunks = [];
r1.setEncoding("utf-8")
r1.on("readable",() => {
  let chunk;
  console.log("开始读取");
  while(null !== (chunk = r1.read())){
    console.log(chunk);
    chunks.push(chunk);
  }
});
r1.on("end",() => {
  console.log("读取完毕");
  // console.log(chunks.toString())
  console.log(chunks);
});