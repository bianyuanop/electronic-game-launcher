var os = require('os');
const exec = require('child_process').exec;
//const fs = require('electron').remote.require('fs')
const lineByLine = require('n-readlines');
var downloads = [];

if (os.type()!='Linux'){
		window.isLinux=false
	}
	else{window.isLinux=true}

function _execute(command, callback) {
	exec(command, (error, stdout, stderr) => { 
		console.log(stdout)
		console.log(stderr)
		callback(); 
	});
};



function getLocalVer(entry){
	
	if (fs.existsSync(`localVer`)) {
		_execute(window.wd+'/busybox.exe zcat localVer', (output) => {
			window.localVer=output;
		});
	} else {
		window.localVer="NaN"
	}
	entry()
	
}

function dlRemoteVer()
{
	if(isLinux){
		_execute("chmod +x "+window.wd+"/busybox.exe",nullFunction)}
	pushOutline("INFO","Downloading remote version info.")
	
	downloadFile("http://ultirts.net/electronic-updater/remoteVer",window.wd+"/remoteVer",getRemoteVer)
}

function getRemoteVer(){

	_execute(window.wd+'/busybox.exe zcat '+window.wd+'/remoteVer', (output) => {
			window.remoteVer=output;
			verAnalysis()
		});
	
	
}

function overwriteVer()
{	pushOutline("WARN","overwritever run!")
	_execute(window.wd+"/busybox.exe mv "+window.wd+"/remoteVer "+window.wd+"/localVer",nullFunction)
}
function removeRemoteVer()
{	pushOutline("WARN","Removing remote Ver!")
	_execute(window.wd+"/busybox.exe rm "+window.wd+"/remoteVer",nullFunction)
}


function downloads2List()
{
	const liner = new lineByLine(window.wd+'/list');
	
	let line;
	
	while (line = liner.next()) {
		window.downloads.push(line)
	}
	contentDownload()
	
}

function execHelper()
{
	if (window.isLinux){
		try{
			_execute(window.wd+"/busybox.exe sh "+window.wd+"/shell.sh",launch)
		}
		catch(err)
		{
			launch()
		}
	}
	else{
		try{
			_execute("cmd "+window.wd+"/shell.bat",launch)
		}
		catch(err)
		{
			launch()
		}
	
}
		
}


function execLobby()
{

clearInterval(window.animateLongmsg);
if (window.isLinux){
	_execute(" chmod +x "+window.wd+"/*.AppImage&& "+"WDIR="+window.wd+" "+window.wd+"/*lobby*.AppImage --appimage-extract-and-run",window.close)
}
else{
	_execute("WDIR="+window.wd+" "+window.wd+"/*.exe",window.close)
}

}

