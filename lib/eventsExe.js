const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;
const lineByLine = require('n-readlines');
window.downloads = [];

listNum = 0;
listCounter = 0;


if (os.type()!='Linux'){
	window.isLinux=false
}
else{window.isLinux=true}

function downloadBusyBox() {
	if(checkIsInDir(window.wd[0], 'busybox.exe')) {
		eventEmitter.emit('downloadedBusybox');
		return;
	}
	if(window.isLinux) {
		downloadFile("http://ultirts.net/electronic-updater/linux/busybox", window.wd+'/busybox.exe', () => {
			eventEmitter.emit('downloadedBusybox');
		});
	}else{
		downloadFile("http://ultirts.net/electronic-updater/win/busybox.exe", window.wd+'/busybox.exe', () => {
			eventEmitter.emit('downloadedBusybox');
		});
	}
}

function getPath() {
	var path = dialog.showOpenDialog({
		properties: ['openDirectory']
	}).then( value => {
		console.log("seleted: ", value.filePaths);
		window.wd = value.filePaths;
		store.set('window.wd', window.wd);
	}).catch(error => {
		console.log(error);
	}).then(() => {
		eventEmitter.emit('locatedFilePath');
	});
}

function downloadRemoteVer(){
	pushOutline("INFO","Downloading remote version info.")
	downloadFile("http://ultirts.net/electronic-updater/remoteVer",window.wd+"/remoteVer",function (){eventEmitter.emit('downloadedRemoteVer')})
}

function getLocalVer(){
	if(isLinux){
	if (fs.existsSync(window.wd+'/localVer')) {
		_execute(window.wd+'/busybox.exe'+" "+'zcat localVer', (output) => {
			window.localVer=output;
			eventEmitter.emit('gotLocalVer')
		});
	} else {
		window.localVer="NaN"
		eventEmitter.emit('gotLocalVer')
	}}
	
	else{
		if (fs.existsSync(window.wd+'\\localVer')) {
			_execute("start \"\" \""+window.wd+"/busybox.exe\" zcat \""+window.wd+"\\localVer\"", (output) => {
				window.localVer=output;
				eventEmitter.emit('gotLocalVer')
			});
		} else {
			window.localVer="NaN"
			eventEmitter.emit('gotLocalVer')
		}
	}
	
}

function getRemoteVerVer(){
	if (isLinux){
	_execute(window.wd+"/busybox.exe"+" zcat "+window.wd+'/remoteVer', (output) => {
			window.remoteVer=output;
			eventEmitter.emit('gotRemoteVer')
		});}
		else {
			_execute("start \"\" \""+window.wd+"/busybox.exe\" zcat \""+window.wd+"\\remoteVer\"", (output) => {
				window.remoteVer=output;
				eventEmitter.emit('gotRemoteVer')
			});}
}


function downloadRemoteFileList(){
pushOutline("INFO","Downloading downloads list")
	pushOutline("WARN","list dl run!")
if (isLinux){

		downloadFile("http://ultirts.net/electronic-updater/linux/list",window.wd+"/list",function (){eventEmitter.emit('downloadedRemoteFileList')}) //download list. callback verDownload
		
	}else{

		downloadFile("http://ultirts.net/electronic-updater/win/list",window.wd+"/list",function (){eventEmitter.emit('downloadedRemoteFileList')})
		
	}



}


function getRemoteFileList(){
const liner = new lineByLine(window.wd+'/list');
	
	let line;
	
	while (line = liner.next()) {
		window.downloads.push(line)
		listNum += 1;
	}
	listNum /= 2;
	eventEmitter.emit('gotFileList')


}

function downloadRemoteFiles(){
pushOutline("WARN","content dl run!")
	 pushOutline("INFO","Downloading the actual files.")
	 for (var i = 0; i < window.downloads.length-2; i +=2 ){
		pushOutline("WARN","downloading"+window.downloads[i]+"to"+window.downloads[i+1])
		downloadFile(String(window.downloads[i]),window.wd+'/'+String(window.downloads[i+1]),()=>{eventEmitter.emit('checkDownloadsDone');})
	 }
	 pushOutline("WARN","downloading"+window.downloads[window.downloads.length-2]+"to"+window.downloads[window.downloads.length-1])
	 //downloadFile('http://ultirts.net/electronic-updater/linux/engine.zip','./engine.zip',helperLaunch)
	 downloadFile(String(window.downloads[window.downloads.length-2]),window.wd+'/'+String(window.downloads[window.downloads.length-1]),function (){eventEmitter.emit('checkDownloadsDone');})
	 titleUpdate("download","DOWNLOADED")
}

function runShell(){
if (window.isLinux){
		try{
			_execute(window.wd+"/busybox.exe sh "+window.wd+"/shell.sh " + window.wd,function (){eventEmitter.emit('shellRan')})
		}
		catch(err)
		{
			//launch()
		}
	}
	else{
		try{
			_execute("start \"\" \""+window.wd+"\\shell.bat\"",function (){eventEmitter.emit('shellRan')})
		}
		catch(err)
		{
			//launch()
		}
	
}
}

function saveRemoteVersion(){
pushOutline("WARN","overwritever run!")
	if (isLinux){_execute(window.wd+"/busybox.exe"+" mv \'"+window.wd+"/remoteVer\' \'"+window.wd+"/localVer\'",nullFunction)}
	else{
		_execute("start \"\" \""+window.wd+"\\busybox.exe\""+" mv \""+window.wd+"\\remoteVer\" \""+window.wd+"\\localVer\"",nullFunction)
		//console.log("start \"\" \""+window.wd+"\\busybox.exe\""+" mv \'"+window.wd+"/remoteVer\' \'"+window.wd+"/localVer\'",nullFunction)
	}

}

function runLobby(){
clearInterval(window.animateLongmsg);
if (window.isLinux){
	_execute(" chmod +x "+window.wd+"/*.AppImage&& "+"WDIR="+window.wd+" "+window.wd+"/lobby.AppImage --appimage-extract-and-run",window.close)
}
else{
	_execute("set WDIR="+window.wd+"&& start \"\" \""+window.wd+"\\lobby.exe\"",nullFunction)
}


}

function _execute(command, callback) {
	exec(command, (error, stdout, stderr) => {
		console.log(stdout)
		console.log(stderr)
		callback(stdout);
	});
}

function checkIsInDir(dirname, filename) {
	let flag = false;
	fs.readdirSync(dirname).forEach(file => {
		if(file == filename) flag=true;
	})
	return flag;
}
