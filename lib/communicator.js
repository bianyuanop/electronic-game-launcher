 
var messenger = require('messenger');
window.downloading=[]

ipcserver = messenger.createListener(3141);
ipcserver.on('dMap', function(message, data){
	
	//window.ipcmessage=message
	//window.ipcdata=data
	if(checkIsInDir(window.wd[0]+'/engine/maps', window.mapIndex[data])){message.reply('retrieved|'+data);console.log('already have map!')}
	else if (window.downloading.includes(data)){console.log('already downloading')}
	else if (data in window.mapIndex){
		window.downloading.push(data)
		downloadFile("http://ulti-repo.eterea.uk/electronic-updater/maps/"+window.mapIndex[data],window.wd+"/engine/maps/"+window.mapIndex[data],function (){
		//window.libunitsync.UnInit();
		
		
		downloadFile("http://ulti-repo.eterea.uk/electronic-updater/maps/"+data+'.png',window.wd+"/engine/maps/"+data+'.png',function (){message.reply('retrieved|'+data);removeFromDownloading(data)})
		
		})}
	
	else {message.reply('error|'+data);console.log('unable to find map from indexer'+String(data))}

	
	
});


ipcserver.on('dAMap', function(message, data){
	
	for (map in window.mapIndex){
		window.downloading.push(map)
		downloadFile("http://ulti-repo.eterea.uk/electronic-updater/maps/"+window.mapIndex[map],window.wd+"/engine/maps/"+window.mapIndex[map],function (){
		//window.libunitsync.UnInit();
		
		
		downloadFile("http://ulti-repo.eterea.uk/electronic-updater/maps/"+map+'.png',window.wd+"/engine/maps/"+map+'.png',function (){message.reply('retrievedAll|'+map);removeFromDownloading(map)})
		
		})}
	
});


function checkIsInDir(dirname, filename) {
	let flag = false;
	fs.readdirSync(dirname).forEach(file => {
		if(file == filename) flag=true;
	})
	return flag;
}


