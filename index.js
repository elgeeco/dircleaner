'use strict';
var fs = require('fs');
var path = require('path');

function _deleteFolderRecursive(dirpath) {

    if( fs.existsSync(dirpath) ) {
       
		fs.readdirSync(dirpath).forEach(function(file,index){
		
            var curPath = dirpath + path.sep + file;
			
            if(fs.lstatSync(curPath).isDirectory()) { 
                _deleteFolderRecursive(curPath);
            } else { 
                fs.unlinkSync(curPath);
            }
			
        });
        fs.rmdirSync(dirpath);
    }
	
};


exports.clean = function(dirpath, makedir){
    
	makedir = makedir || false;
	
	_deleteFolderRecursive(dirpath);
	
	if( !makedir) return;
	
    if(!fs.existsSync( dirpath )){
        fs.mkdirSync(dirpath,  function(err){
            if(err) return console.log(err.message);
        });
    }
}