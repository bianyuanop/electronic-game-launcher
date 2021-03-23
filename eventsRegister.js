const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('downloadRemoteVer', () => {
  downloadRemoteVer()
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

eventEmitter.on('ShellRan', () => {
	saveRemoteVersion()
	runLobby()
	 pushOutline("INFO","Launching.")
	 stopSound()
	 //titleUpdate("download","DOWNLOADED")
	 
	 titleUpdate("analyze","ANALYZED")
})

eventEmitter.emit('downloadRemoteVer')
