const fs = require('fs');




function preEntry(){
	document.getElementById("blocker").style.visibility="visible";
	document.getElementById('wd').onclick = function(event) {
		window.wd = rootPath
		
		getLocalVer(entry);
		store.set('window.wd', window.wd);
		document.getElementById("blocker").style.visibility="hidden";
	}
}

function entry(){
if (window.localVer=="NaN")
{
	if (isLinux){
		pushOutline("INFO","isLinux: "+isLinux )
		pushOutline("INFO","Start downloading busybox for Linux.")
		//downloadFile("http://192.168.1.1:8080","./b.exe",true,dlRemoteVer) //download busybox. callback verDownload
		downloadFile("http://ultirts.net/electronic-updater/linux/busybox",window.wd+"/busybox.exe",dlRemoteVer)
		pushOutline("INFO","Busybox download completed")
	
	}else{
		pushOutline("INFO","isLinux: "+isLinux )
		pushOutline("INFO","Unknown OS, start downloading for likely Windows.")
		downloadFile("http://ultirts.net/electronic-updater/win/busybox.exe",window.wd+"/busybox.exe",dlRemoteVer)
		pushOutline("INFO","Busybox download completed")
	
	}
}
else{
	dlRemoteVer()
}
}

//


function verAnalysis(){
	titleUpdate("download","DOWNLOADED")
	
	if (window.localVer!=window.remoteVer)
	{	pushOutline("WARN","Remote version content differs from local content, updating local version.")
		resetTitle("download","DOWNLOAD")
		titleUpdate("upload","UPLOADED")
		listDownload()
		}
	else
	{	titleUpdate("analyze","ANALYZED")
		//pushOutline("INFO","Launching")
		removeRemoteVer()
		launch()}
	
}


function listDownload(){
	
	pushOutline("INFO","Downloading downloads list")
	pushOutline("WARN","list dl run!")
	
	
	if (isLinux){

		downloadFile("http://ultirts.net/electronic-updater/linux/list",window.wd+"/list",downloads2List) //download list. callback verDownload
		
	}else{

		downloadFile("http://ultirts.net/electronic-updater/win/list",window.wd+"/list",downloads2List)
		
	}
	
}
 
 function contentDownload(){
	 
	pushOutline("WARN","content dl run!")
	 pushOutline("INFO","Downloading the actual files.")
	 for (var i = 0; i < window.downloads.length-2; i +=2 ){
		pushOutline("WARN","downloading"+window.downloads[i]+"to"+window.downloads[i+1])
		downloadFile(String(window.downloads[i]),window.wd+'/'+String(window.downloads[i+1]),nullFunction)
	 }
	 pushOutline("WARN","downloading"+window.downloads[window.downloads.length-2]+"to"+window.downloads[window.downloads.length-1])
	 //downloadFile('http://ultirts.net/electronic-updater/linux/engine.zip','./engine.zip',helperLaunch)
	 downloadFile(String(window.downloads[window.downloads.length-2]),window.wd+'/'+String(window.downloads[window.downloads.length-1]),helperLaunch)
	 titleUpdate("download","DOWNLOADED")
 }
 
 function helperLaunch(){
	 pushOutline("INFO","Final setup.")
	 
	 
	 execHelper()
	 
 }
 function launch(){
	 pushOutline("INFO","Launching.")
	 stopSound()
	 //titleUpdate("download","DOWNLOADED")
	 
	 titleUpdate("analyze","ANALYZED")
	 overwriteVer()
	 execLobby()
}
 
 
