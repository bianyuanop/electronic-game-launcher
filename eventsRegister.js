

const EventEmitter = require('events')
const eventEmitter = new EventEmitter()


eventEmitter.on('gotOSVer', () => {
    getPath();
	console.log('got OSVER')
})

eventEmitter.on('gotPath', () => {
    getDB();
	console.log('got path')
})

eventEmitter.on('gotDB', () => {
    getRemoteArchiveCheckSum();
    getMapAssociation();
	console.log('got db')
})

eventEmitter.on('gotRemoteArchiveCheckSum', () => {
    getLocalArchiveCheckSum();
	console.log('got rCsum')
})

eventEmitter.on('gotLocalArchiveCheckSum', () => {
    checkForDifference()
	console.log('got lCsum')
})

eventEmitter.on('failedCheckDifference', () => {
    downloadDifferentArchives()
	console.log('differential failure')
})



eventEmitter.on('downloadedDifferentArchives', () => {
    deletePathes();
	console.log('partial defferentiate')
})

eventEmitter.on('deletedPathes', () => {
	extractFile()
	console.log('de path')
	
})

eventEmitter.on('extracted', () => {
	//checkForDifference()
	getLocalArchiveCheckSum();
	console.log('extracted')
})

eventEmitter.on('extractedLocalArchives', () => {
    launch();
	console.log('launching')
})


