import fb64 from "file-base64";

import process from "process";
import fs from "fs";
import path from 'path';
const __dirname = path.resolve();
// print process.argv
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
myArgs.forEach((val, index) => {

	var filename = `${val}.${index}`;
	console.log('first'+index+" = "+val);
	// save to files argument (a boolean)
	// if(index==0){
	// 	save = val;
	// }
	// output to console binary
	// if(index==3){
	// 	pipe = val;
	// }
	if(filename == ""){
		process.exit(-1);
	}else{
		var finalFile = __dirname+"\\"+filename;
		const currentFile = finalFile.split('.');
		currentFile.pop();

		fs.open(currentFile, "w+", 777, (err, fd)=>{
			fb64.encode(fd, (err, base64String)=>{
				const buffer = new Buffer(base64String);
				console.log(buffer, buffer.length);
				// fs.write(fd, buffer, 0, buffer.length, 'utf8', (err)=>{
				fs.writeFile(fd, base64String, (err)=>{
					//handle error
					if(err){
						console.error(err);
					}
				    fs.close(fd, function (err) {
				    	//handle error
						if(err){
							console.error(err);
						}
						console.log("Appended "+filename+" to file.");
				    });
				});
			});
		});
	}

});
process.exit(0);