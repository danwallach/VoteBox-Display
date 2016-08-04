/**
 * Created by brian on 6/24/16.
 */
$(document).ready(function () {
    var acceptSound = document.createElement('audio');
    acceptSound.setAttribute('src', 'audio/success.wav');
    acceptSound.setAttribute('autoplay', 'autoplay');

    var rejectSound = document.createElement('audio');
    rejectSound.setAttribute('src', 'audio/reject.wav');
    rejectSound.setAttribute('autoplay', 'autoplay');


    var previousResponse = "offline";


	
    displayStatus();

    function displayStatus() {
        var status = {
            offline: {
                header: "Offline",
                message: "Please notify a poll worker. Do not insert ballots into this machine.",
                color: "#FFFFFF",       // White
                background: "#212121",   // Grey 900
                primary: "1",
                secondary: ".7",
                divider: ".5"
            },
            waiting: {
                header: "Insert your unfolded ballot into the top slot.",
                message: "",
                color: "#000000",       // Black
                background: "#FFFFFF",   // White
                primary: ".87",
                secondary: ".54",
                divider: ".38"
            },
            pending: {
                header: "Please wait...",
                message: "",
                color: "#FFFFFF",       // White
                background: "#616161",   // Grey 700
                primary: "1",
                secondary: ".7",
                divider: ".5"
            },
            accept: {
                header: "Your ballot was cast.",
                message: "",
                color: "#FFFFFF",       // White
                background: "#388E3C",   // Green 700
                primary: "1",
                secondary: "1",
                divider: "1"
            },
            reject: {
                header: "Your ballot was not recognized. Only insert unfolded ballots.",
                message: "",
                color: "#FFFFFF",       // White
                background: "#F44336",   // Red 500
                primary: "1",
                secondary: "1",
                divider: "1"
            }
        };
		
		var connection = new WebSocket('ws://applepi.cs.rice.edu/pushstatus');

		connection.onopen = function () {
			connection.send("ACK");
		};
		
		connection.onerror = function (error) {
			console.log('WebSocket error ' + error);
		};
		
        connection.onmessage = function (msg) {
			setStatus(msg.data);
		};

        function setStatus(response) {
            // response = "reject";

            var background = $("body");
            var primary = $("h3");
            var secondary = $("p");
            var divider = $(".text-divider::after");

            background.css({"background-color": status[response].background});
            primary.html(status[response].header);
            secondary.html(status[response].message);
            $("h3, p, .text-divider.xxlarge::after").css({"color": status[response].color});
            primary.css({"opacity": status[response].primary});
            secondary.css({"opacity": status[response].secondary});

            if (previousResponse == response) {
                // console.log("Match.");
            }
            else {
                if (response == "accept") {
                    acceptSound.play();
                }
                else if (response == "reject") {
                    rejectSound.play();
                }
            }

            previousResponse = response;
        }

    }
});