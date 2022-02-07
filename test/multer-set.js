const fs = require('fs');
const path =require('path');
const multer = require('multer');
const { constants } = require('buffer');

const destination = function (req, file, cb) {
  const { username } = req.body;
  console.log(username)
  const dest = path.join(__dirname,`uploads/${username}`);

  fs.access(dest, constants.F_OK, function (error) {
    if (error) {
      // console.log("Directory does not exist.");
      return fs.mkdir(dest, (error) => {console.log(error)});
    } else {
      // console.log("Directory exists.");
      return cb(null, dest);
    }
  });
  // cb(null, dir);
};

const filename = function (req, file, cb) {
  const { username } = req.body;
  const dest = path.join(__dirname,`uploads/${username}`,file.originalname);
  console.log(dest)
  fs.access(dest, constants.F_OK, (error)=>{
      if(error){
        return cb(null, file.originalname);
      }
      const filename = newFileNameForDup(file.originalname);
      cb(null, filename);
  })
}

const storage = multer.diskStorage({
    destination,
    filename
});


//중복 발생시 unique한 파일명을 반환합니다.
function newFileNameForDup(fullFilename){
  const split = fullFilename.split('.');
  let filename = split[0];
  let ext = split[split.length -  1];
  if(split.length > 1){
    for(let i = 1 ; i < split.length - 1; i++)
      filename += split[i];
  }
  return filename +"(2)" + `.${ext}`;
}

module.exports = multer({
    storage: storage
});
  