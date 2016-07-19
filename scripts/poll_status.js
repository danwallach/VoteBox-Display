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
                message: "Reach for the unreachable &mdash; advice for life, but not for networks.",
                color: "#FFFFFF",       // White
                background: "#212121",   // Grey 900
                primary: "1",
                secondary: ".7",
                divider: ".5"
            },
            waiting: {
                header: "Waiting",
                message: "Place your ballot in the tray.",
                color: "#000000",       // Black
                background: "#FFFFFF",   // White
                primary: ".87",
                secondary: ".54",
                divider: ".38"
            },
            pending: {
                header: "Pending",
                message: "Have some tea. We'll just be a moment.",
                color: "#FFFFFF",       // White
                background: "#616161",   // Grey 700
                primary: "1",
                secondary: ".7",
                divider: ".5"
            },
            accept: {
                header: "Accept",
                message: "Your ballot was cast.",
                color: "#FFFFFF",       // White
                background: "#388E3C",   // Green 700
                primary: "1",
                secondary: "1",
                divider: "1"
            },
            reject: {
                header: "Reject",
                message: "This ballot was invalid.",
                color: "#FFFFFF",       // White
                background: "#F44336",   // Red 500
                primary: "1",
                secondary: "1",
                divider: "1"
            }
        };

        $.ajax({
            method: 'GET',
            url: 'http://applepi.cs.rice.edu/status',
            contentType: 'text/plain',

            xhrFields: {
                withCredentials: false
            }
        })
            .done(function (data) {
                // console.log(data);
                if (data.indexOf("waiting") >= 0) {
                    setStatus("waiting");
                }
                else if (data.indexOf("pending") >= 0) {
                    setStatus("pending");
                }
                else if (data.indexOf("accept") >= 0) {
                    setStatus("accept");
                }
                else if (data.indexOf("reject") >= 0) {
                    setStatus("reject");
                }
            })

            .fail(function () {
                setStatus("offline");
            })
            .always(function () {
                displayStatus();
            });

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