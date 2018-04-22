browser.runtime.onMessage.addListener(command);
browser.tabs.onUpdated.addListener(cleanup);

var timeleft_ms;
var activate = false;

/*Parses message from extension script*/
function command(message) {
	if (message === "disable") {disable();}
	
	else { activated(message); 
		DisplayTimeLeft(message);
	}
}

function activated(time_min) {

	timeleft_ms = time_min * 60000;
	countdown(timeleft_ms);
}

function countdown(timeleft_ms) {
if (timeleft_ms === 0) {
	activate = false;}
else {
	activate = true;
	setTimeout(function(){activate = false} , timeleft_ms);
}
}

function cleanup() {
if (activate === false) {return;}
browser.tabs.insertCSS({file: "CleanPage.css"});
}

function disable() {
	browser.tabs.removeCSS({file: "CleanPage.css"});
}

function DisplayTimeLeft(time_min) { 
    var start = Date.now();
    var diff;
    var min;
    var sec;
    time_min=time_min * 60  
    function countdown() {
        
        diff = time_min - (((Date.now() - start) / 1000) | 0);
       
        min = (diff / 60) | 0;
        sec = (diff % 60) | 0;

        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        browser.runtime.sendMessage(min + ":" + sec); 

        if (min== 0 && sec == 0) { //stop timer when time reaches 0
        	clearInterval(int);
        }

            };
    countdown();
    var int = setInterval(countdown, 1000);
}