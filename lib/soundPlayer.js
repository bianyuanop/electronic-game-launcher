function playSound(file='title.mp3',loop=false){
	window.audiovolumeFade=0
	if(window.isPlaying)
	{
		window.audioTimer = setInterval(_audiofade, 100,file,loop);
}
	else{	
	window.audio = new Audio('assets/'+file);
	window.audio.play();
	window.isPlaying=true
	if(loop){
		window.audio.onended = function() {
			window.audio = new Audio('assets/loop_'+file);
			window.audio.loop=true
			window.audio.play();
			window.isPlaying=true
		}}
	}
	
}

function stopSound(){
	window.audioTimer = setInterval(_audiostop, 100);
}

function _audiofade(file,loop){
	if (window.audiovolumeFade>=20){
		clearInterval(window.audioTimer);
		window.audio.pause()
		window.audio = new Audio('assets/'+file);
		window.audiovolumeFade=0
		window.audio.play()
		if(loop){
			window.audio.onended = function() {
				window.audio = new Audio('assets/loop_'+file);
				window.audio.loop=true
				window.audio.play();
				window.isPlaying=true
				}
		}
	
	}
	else{
		//console.log('v fade val'+window.audiovolumeFade)
		
		window.audio.volume-=0.0475
		window.audiovolumeFade+=1
	}
	
}

function _audiostop(){
	if (window.audiovolumeFade>=20){
		clearInterval(window.audioTimer);
		window.audio.pause()
		window.isPlaying=false
		window.audio.volume=1
	}
	else{
		//console.log('v fade val'+window.audiovolumeFade)
		
		window.audio.volume-=0.0475
		window.audiovolumeFade+=1
	}
	
}

playSound('title.wav',true)
