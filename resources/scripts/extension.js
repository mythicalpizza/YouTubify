var speeds = [500, 325, 250, 175, 100];

function ppToggle(){
	if(this.currentTime > 0 && this.paused == false && this.ended == false){
		//the video is currently playing
		this.pause();
	}
	else{
		//the video is not playing
		this.play();
	}
}

var ppToggleFS = function(){
	//Handle Fullscreen events
	if(!document.webkitFullscreenElement){
		this.webkitRequestFullscreen();
	}
	else{
		document.webkitExitFullscreen();
	}
}

var ppClickHandler = function(doubleClickCallback, singleClickCallback, clickSpeed){
	var clicks = 0, timeout;
	return function() {
			clicks++;
			if (clicks == 1) {
					singleClickCallback && singleClickCallback.apply(this, arguments);
					timeout = setTimeout(function() { clicks = 0; }, clickSpeed);
			} else {
					timeout && clearTimeout(timeout);
					doubleClickCallback && doubleClickCallback.apply(this, arguments);
					clicks = 0;
			}
	};
}

function stopAutoPlay(el){
	//Remove autoplay attribute
	el.removeAttribute("autoplay");

	//If the video has already started, pause and reset it
	if(el.currentTime > 0){
		el.pause();
		el.currentTime = 0;
	}
}

function youTubify(disableAP, speed){
	//Get all the videos on the page
	var videos = document.getElementsByTagName("video");

	if(window.location.href.indexOf("youtube.com") <= -1){
		for(var x = 0; x < videos.length; x++){

			//Add ability to click on videos
			videos[x].addEventListener('click', ppClickHandler(ppToggleFS, ppToggle, speed));

			if(disableAP){
				stopAutoPlay(videos[x]);
			}
		}
	}
}
