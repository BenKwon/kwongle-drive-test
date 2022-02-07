const express = require('express');
const fs = require('fs');
const path =require('path');
const dotenv = require('dotenv');
const multer = require('multer');
// const upload = multer({dest :'uploads/'});


const upload = require('./multer-set');

dotenv.config();

const app = express();

app.set('port',process.env.PORT || 8003);
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//welcome router
app.get('/', async(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
//file upload
app.post('/upload', (req, res) => {
    upload.array('fileToUpload')(req,res,(err)=>{
      if(err){
        console.log(err);
        return console.log("upload router error");
      }
      // console.log(req.files);
    });
  });

//file download
app.get('/download/:path',(req,res,next)=>{
  const targetPath = path.join(__dirname,'uploads',req.params.path);
  //Content-Disposition를 필수로 넣어줘야함 이 헤더를 브라우저가 읽고 다운로드라고 인식
  res.setHeader('Content-Disposition', `attachement; filename=${targetPath}`);
  res.sendFile(targetPath);
});

//make directory


//


app.listen(app.get('port'),()=>{
    console.log("listening on port " + app.get('port'));
})