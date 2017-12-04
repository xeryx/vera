var express = require('express');
var router = express.Router();
var exec = require('child_process').execFile;


router.route('/:par1?/:par2?/:par3?/:par4?/:par5?')
.get(function(req, res) { 

    var paramsArray = [];
    Object.keys(req.params).forEach(function(key) {
        if(req.params[key]) {
            paramsArray.push(req.params[key]);
        }
    });

    exec(__dirname + '/../bin/LoadDbAccess.exe',paramsArray,  function(error, stdout, stderr) {
          if(!error) {
              return res.json({"success":"true","request":stdout.trim()});
          }
          else {
              return res.json({"success":"false", "error":error});
          }
    });  
   
  }
);	

module.exports = router;