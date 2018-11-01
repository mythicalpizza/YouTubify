function checkIfConfig(){
	if(document.getElementById("youtubify-config") != null){
	  document.getElementById("disable-autoplay").addEventListener('change', savePrefs);
	  document.getElementById("double-click-speed").addEventListener('change', savePrefs);
	  loadPrefs();
	}
}

window.onload = function(){
  if(document.getElementById("youtubify-config") != null){
	  document.getElementById("disable-autoplay").addEventListener('change', savePrefs);
	  document.getElementById("double-click-speed").addEventListener('change', savePrefs);
	  loadPrefs();
	}
  else{
    chrome.storage.sync.get({"disableautoplay": true, "dblClickSpeed": 2}, function(i){
  		//Add click events
  		youTubify(i.disableautoplay, speeds[i.dblClickSpeed]);
  	});
  }


}

function savePrefs(){
  console.log("Saved");

  //Save Double Click Speed
  var dblClickSpeed = document.getElementById("double-click-speed").selectedIndex;
  chrome.storage.sync.set({"dblClickSpeed": dblClickSpeed}, function(){
    console.log("Setting Saved");
  });

  //Save Disable Autoplay
  var disableAutoplay = document.getElementById("disable-autoplay").checked;
  //localStorage.setItem("disableautoplay", disableAutoplay);
  chrome.storage.sync.set({"disableautoplay": disableAutoplay}, function(){
    console.log("Setting Saved");
  });
}

function loadPrefs(){
  console.log("Loaded");
  //Set Double CLick Speed
  chrome.storage.sync.get({"dblClickSpeed": 2 }, function(index) {
    var dblClickSpeedEl = document.getElementById("double-click-speed");
    dblClickSpeedEl.options[index.dblClickSpeed].selected = true;
  });

  //Set Disable Autoplay
  /*if(localStorage.getItem("disableautoplay") != null){
    document.getElementById("disable-autoplay").checked = localStorage.getItem("disableautoplay");
  }
  else{
    localStorage.setItem("disableautoplay", true);
    document.getElementById("disable-autoplay").checked = localStorage.getItem("disableautoplay");
  }*/
  chrome.storage.sync.get({"disableautoplay": true }, function(index) {
    document.getElementById("disable-autoplay").checked = index.disableautoplay;
  });
}
