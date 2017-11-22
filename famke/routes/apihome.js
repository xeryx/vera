var express = require('express');
var router = express.Router();
var os  = require('os');


router.route('/')
	
.get(function(req, res) {
	return res.send("Hello from: " +  os.hostname());
});

module.exports = router;