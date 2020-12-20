downloadWhiteValue=255
uploadWhiteValue=255
analyzeWhiteValue=255
window.downloadAnimating=false
window.uploadAnimating=false
window.analyzeAnimating=false
function titleUpdate(id,toTitle){
	pushOutline("INFO","updating title.")
	if (id=='download'&&!window.downloadAnimating){
	window.titleDownloadAnimate = setInterval(_downloadRedShift, 20,id,toTitle);
	}
	if (id=='upload'&&!window.uploadAnimating){
		window.titleUploadAnimate = setInterval(_uploadRedShift, 20,id,toTitle);
	}
	if (id=='analyze'&&!window.analyzeAnimating){
		window.titleAnalyzeAnimate = setInterval(_analyzeRedShift, 20,id,toTitle);
	}
}

function progressUpdate(id,percentage){
	document.getElementById(id).innerHTML="▀"
	
	while (percentage>=0){
		document.getElementById(id).innerHTML+="▀"
	
		percentage-=0.01
	}
	
}

function resetTitle(id,toTitle)
{	
	window.titleSwap = setInterval(_titleSwap, 2,id,toTitle);

}

setInterval(_cursorBlink, 400);
function _cursorBlink()
{	if (document.getElementById("cursor").style.visibility=="hidden"){
	document.getElementById("cursor").style.visibility="visible"}
	else{
		document.getElementById("cursor").style.visibility="hidden"
	}
}

function _titleSwap(id,title)
{
//	console.log(window.blackValue)
	window.blackValue-=0.02
	if(window.blackValue<=0)
	{
		if 	(window.blackValue>=-0.1)
		{
			document.getElementById(id).style.left="100%"
			
		}
		
		document.getElementById(id).style.left=100-27*(-window.blackValue)+"%";
		thergb = "rgba(0,0,0,"+(-window.blackValue)+")"; 
		document.getElementById(id).style.background=thergb;
		if (window.blackValue<=-1){
			clearInterval(window.titleSwap);
			blackValue=1;
			
			document.getElementById(id).style.left=73+"%"
			document.getElementById(id).style.background="rgba(0,0,0,1)"
			document.getElementById(id).innerHTML=title;
		}
			
	}
	else{
		thergb = "rgba(0,0,0,"+window.blackValue+")"; 
		document.getElementById(id).style.background=thergb;
		document.getElementById(id).style.left=73-27*(1-window.blackValue)+"%";
		
	}
}

function _downloadRedShift(id,toTitle)

{	window.downloadAnimating=true
	
	
	if (window.downloadWhiteValue>=0){
		thergb = "rgb(" + 255 + "," + window.downloadWhiteValue + "," + window.downloadWhiteValue + ")"; 
		document.getElementById(id).style.color=thergb;
	}
	
	if (window.downloadWhiteValue<=0)
		{
		if(window.downloadWhiteValue<=-65){
			document.getElementById(id).style.color="rgb(255,255,255)";
			document.getElementById(id).style.background="red";
		}
		
		if(window.downloadWhiteValue<=-125)
		{
			thergb = "rgb(" + 255 + "," + window.downloadWhiteValue + "," + window.downloadWhiteValue + ")"; 
			clearInterval(window.titleDownloadAnimate)
			window.downloadWhiteValue=255	
			document.getElementById(id).innerHTML=toTitle
			thergb = "rgb(" + 255 + "," + 255 + "," + 255 + ")"; 
			document.getElementById(id).style.color=thergb;
			document.getElementById(id).style.background="black";
			window.downloadAnimating=false
			
		}
		}
	window.downloadWhiteValue-=5
}

function _uploadRedShift(id,toTitle)
{window.uploadAnimating=true
	
	if (window.uploadWhiteValue>=0){
		thergb = "rgb(" + 255 + "," + window.uploadWhiteValue + "," + window.uploadWhiteValue + ")"; 
		document.getElementById(id).style.color=thergb;
	}
	
	if (window.uploadWhiteValue<=0)
		{
		if(window.uploadWhiteValue<=-65){
			document.getElementById(id).style.color="rgb(255,255,255)";
			document.getElementById(id).style.background="red";
		}
		
		if(window.uploadWhiteValue<=-125)
		{window.uploadAnimating=false
			thergb = "rgb(" + 255 + "," + window.uploadWhiteValue + "," + window.uploadWhiteValue + ")"; 
			clearInterval(window.titleUploadAnimate)
			window.uploadWhiteValue=255	
			document.getElementById(id).innerHTML=toTitle
			thergb = "rgb(" + 255 + "," + 255 + "," + 255 + ")"; 
			document.getElementById(id).style.color=thergb;
			document.getElementById(id).style.background="black";
			
		}
		}
	window.uploadWhiteValue-=5
}

function _analyzeRedShift(id,toTitle)
{window.analyzeAnimating=true
	
	if (window.analyzeWhiteValue>=0){
		thergb = "rgb(" + 255 + "," + window.analyzeWhiteValue + "," + window.analyzeWhiteValue + ")"; 
		document.getElementById(id).style.color=thergb;
	}
	
	if (window.analyzeWhiteValue<=0)
		{
		if(window.analyzeWhiteValue<=-65){
			document.getElementById(id).style.color="rgb(255,255,255)";
			document.getElementById(id).style.background="red";
		}
		
		if(window.analyzeWhiteValue<=-125)
		{window.analyzeAnimating=false
			thergb = "rgb(" + 255 + "," + window.analyzeWhiteValue + "," + window.analyzeWhiteValue + ")"; 
			clearInterval(window.titleAnalyzeAnimate)
			window.analyzeWhiteValue=255	
			document.getElementById(id).innerHTML=toTitle
			thergb = "rgb(" + 255 + "," + 255 + "," + 255 + ")"; 
			document.getElementById(id).style.color=thergb;
			document.getElementById(id).style.background="black";
			
		}
		}
	window.analyzeWhiteValue-=5
}
