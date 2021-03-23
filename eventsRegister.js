const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

const {dialog} = require('electron').remote;

eventEmitter.on('start', () => {
	if(store.has('window.wd')) {
		window.wd = store.get('window.wd');
		eventEmitter.emit('locatedFilePath');
	}else{
		getPath();
	}
})

eventEmitter.on('downloadedBusybox', () => {
  downloadRemoteVer()
});

eventEmitter.on('checkDownloadsDone', () => {
	listCounter += 1;
	console.log(listCounter, "/", listNum);	
	if(listCounter >= listNum) runShell();
})

eventEmitter.on('locatedFilePath', () => {
	downloadBusyBox();
})

eventEmitter.on('downloadedRemoteVer', () => {
  getLocalVer()
})

eventEmitter.on('gotLocalVer', () => {
  getRemoteVerVer()
})

eventEmitter.on('gotRemoteVer', () => {
  if (window.localVer==window.remoteVer)
  {
  	runLobby()
  }
  else {
   downloadRemoteFileList()
  }
})

eventEmitter.on('downloadedRemoteFileList', () => {
	getRemoteFileList()
})

eventEmitter.on('gotFileList', () => {
	downloadRemoteFiles()
})

eventEmitter.on('gotRemoteFiles', () => {
	runShell()
})

eventEmitter.on('shellRan', () => {
	saveRemoteVersion()
	runLobby()
	 pushOutline("INFO","Launching.")
	 stopSound()
	 //titleUpdate("download","DOWNLOADED")
	 
	 titleUpdate("analyze","ANALYZED")
})

eventEmitter.emit('start')
