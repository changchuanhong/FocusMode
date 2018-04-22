var disable_site = document.querySelector(".disable_site");
var activate = document.querySelector(".Activate");

function EventListeners() {
    activate.addEventListener("click", Activate);
    disable_site.addEventListener("click", DisableSite);
    browser.runtime.onMessage.addListener(ShowTimer);
}

function DisableSite () {browser.runtime.sendMessage("disable");}

function Activate() {
    var time_min = document.getElementById("time_min").value;  
	browser.runtime.sendMessage(time_min);
}

function ShowTimer(timedisplay) {
    var time_shown  = document.querySelector("#time_shown");
    time_shown.textContent = timedisplay 
}

EventListeners()

