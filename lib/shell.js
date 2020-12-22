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
		callback(stdout); 
	});
};



function getLocalVer(entry){
	
	if (fs.existsSync(`localVer`)) {
		_execute('./busybox.exe zcat localVer', (output) => {
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
	_execute("chmod +x ./busybox.exe",nullFunction)}
pushOutline("INFO","Busybox download completed")
pushOutline("INFO","Downloading remote version info.")
titleUpdate("download","DOWNLOADED")
downloadFile("http://ultirts.net/electronic-updater/remoteVer","remoteVer",getRemoteVer)
}

function getRemoteVer(){

		_execute('./busybox.exe zcat remoteVer', (output) => {
			window.remoteVer=output;
			verAnalysis()
		});
	
	
}

function overwriteVer()
{	pushOutline("WARN","overwritever run!")
	_execute("./busybox.exe mv ./remoteVer ./localVer",listDownload)
}
function removeRemoteVer()
{	pushOutline("WARN","Removing remote Ver!")
	_execute("./busybox.exe rm ./remoteVer",nullFunction)
}


function downloads2List()
{
	const liner = new lineByLine('./list');
	
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
		_execute("./shell.sh",launch)
		}
		catch(err)
		{
			launch()
		}
	}
	else{
		try{
			_execute("./shell.bat",launch)
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
	_execute("chmod +x *.AppImage&& ./*lobby*.AppImage --appimage-extract-and-run",nullFunction)
}
else{
	_execute("./*.exe",nullFunction)
}

}

