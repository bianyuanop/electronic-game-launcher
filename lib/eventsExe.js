const {dialog} = require('electron').remote;
const sqlite3 = require('sqlite3');
archives_checksum={}
localArchives_checksum={}
window.mapIndex={}
const md5File = require('md5-file')
const forceDelete = require('fs-force-delete')
const extract = require('extract-zip')
var shell = require('shelljs');

function getOSVer(){
	window.isLinux=(os.type()=='Linux')
	eventEmitter.emit('gotOSVer');
	if (window.isLinux){banHeader='win'}else{banHeader='linux'}
}

function getPath(){
	
	if(store.has('window.wd')) {
    //updateProgress()
		console.log('already installed')
		window.wd = store.get('window.wd');
		eventEmitter.emit('gotPath');}
	else{
		document.getElementById('blocker').style.visibility=''
	}
	
}

function getPathUsingDialog(){
	
	var path = dialog.showOpenDialog({
		properties: ['openDirectory']
	}).then( value => {
		console.log("seleted: ", value.filePaths);
		window.wd = value.filePaths;
		store.set('window.wd', window.wd);
	}).catch(error => {
		console.log(error);
	}).then(() => {
		eventEmitter.emit('gotPath');
		document.getElementById('blocker').style.visibility='hidden'
	});
	
}


function getDB(){
	downloadFile("http://ulti-repo.eterea.uk/dNTPDl/info.db",window.wd+"/info.db",function (){eventEmitter.emit('gotDB')})
}

function getRemoteArchiveCheckSum(){
	const db = new sqlite3.Database(window.wd+'/info.db');
	//Retrieving All Rows
	db.all("SELECT zip_name, extract_to,zip_hash FROM archives", (error, rows) => {
    rows.forEach((row) => {
        archives_checksum[row.zip_name]=[]
		archives_checksum[row.zip_name][0]=row.extract_to
		archives_checksum[row.zip_name][1]=row.zip_hash
    })
	
		eventEmitter.emit('gotRemoteArchiveCheckSum')
	});
}

function getMapAssociation(){
	const db = new sqlite3.Database(window.wd+'/info.db');
	//Retrieving All Rows
	db.all("SELECT map_name, map_filename FROM maps", (error, rows) => {
    		rows.forEach((row) => {
        	//console.log(row.EmployeeId + " " + row.FirstName);
        		window.mapIndex[row.map_name]=row.map_filename
		})
	});
}

function getLocalArchiveCheckSum(){
	totalZips=0
	processedZips=0
	for (zipName in archives_checksum){
		localArchives_checksum[zipName]=[]
		try{
			localArchives_checksum[zipName][0] = md5File.sync(window.wd+'/'+zipName)
			
		}
		catch{localArchives_checksum[zipName][0]='nohash';localArchives_checksum[zipName][1]=true;processedZips+=1;}}
		
		
	eventEmitter.emit('gotLocalArchiveCheckSum')
}

function checkForDifference(){
	failed=false
	for(zipName in archives_checksum){
		console.log(zipName+': '+archives_checksum[zipName][1]+' VS '+localArchives_checksum[zipName][0])
		if (archives_checksum[zipName][1]!=localArchives_checksum[zipName][0]&&!zipName.startsWith(banHeader)){
			failed=true
			localArchives_checksum[zipName][1]=true
			
		}
	}
	if (failed){eventEmitter.emit('failedCheckDifference')}
	else{eventEmitter.emit('extractedLocalArchives')}
}

function downloadDifferentArchives(){
	totalDownloads=0
	downloaded=0
	
	for (zipName in archives_checksum){
		if (localArchives_checksum[zipName][1]&&!zipName.startsWith(banHeader)){
			totalDownloads+=1
			downloadFile("http://ulti-repo.eterea.uk/dNTPDl/archives/"+zipName,window.wd+'/'+zipName,function (){
				downloaded+=1
				
				if (downloaded>=totalDownloads){eventEmitter.emit('downloadedDifferentArchives')}
			})
		}
		
	}
}

function deletePathes(){
	for (zipName in archives_checksum){
		
		console.log('trying to d'+window.wd+'/'+archives_checksum[zipName][0])
		 shell.mkdir('-p', window.wd+'/'+archives_checksum[zipName][0]);
		 //forceDelete(archives_checksum[zipName][0]) 

	}
	eventEmitter.emit('deletedPathes')
}

async function extractFile(){
	try {
		for (zipName in archives_checksum){
			await extract(window.wd+'/'+zipName, { dir: window.wd+'/'+archives_checksum[zipName][0] })
   		}
  		eventEmitter.emit('extractedLocalArchives')
  	} catch (err) {}
}



function launch(){
    stopSound()
	clearInterval(window.animateLongmsg);
	if (window.isLinux){
		_execute(" chmod +x "+window.wd+"/lobby/*.AppImage&& "+"WDIR="+window.wd+" "+window.wd+"/lobby/*.AppImage --appimage-extract-and-run",nullFunction)
	}
	else{
		_execute("set WDIR="+window.wd+"&& start \"\" \""+window.wd+"\\lobby\\lobby.exe\"",nullFunction)
	}


}


function _execute(command, callback) {
	exec(command, (error, stdout, stderr) => {
		console.log(stdout)
		console.log(stderr)
		callback(stdout);
	});
}



function updateProgress(){
    window.completedEvent++;
    progress=(window.completedEvent/window.totalEvents*100).toFixed(2);
    document.getElementById('totalProgress').innerHTML=progress+'%'
}
