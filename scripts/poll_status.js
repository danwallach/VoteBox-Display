/**
 * Created by brian on 6/24/16.
 */
$( document ).ready(function() { displayStatus(); });

function displayStatus() {
    var status = {
        offline: {
            header: "Offline",
            message: "Reach for the unreachable &mdash; advice for life, but not for networks.",
            color: "#FFFFFF",       // White
            background: "#616161"   // Grey 700
        },
        waiting: {
            header: "Waiting",
            message: "Place your ballot in the tray.",
            color: "#000000",       // Black
            background: "#FFFFFF"   // White
        },
        pending: {
            header: "Pending",
            message: "Have some tea. We'll just be a moment.",
            color: "#FFFFFF",       // White
            background: "#616161"   // Grey 700
        },
        accept: {
            header: "Accept",
            message: "Your ballot was cast.",
            color: "#FFFFFF",       // White
            background: "#388E3C"   // Green 700
        },
        reject: {
            header: "Reject",
            message: "This ballot was invalid.",
            color: "#FFFFFF",       // White
            background: "#D32F2F"   // Red 700
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
            console.log(data);
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
        .always(function() {
            displayStatus();
        });

        function setStatus(response) {
            $("h3").html(status[response].header);
            $("p").html(status[response].message);
            $("h3, p").css({"color": status[response].color});
            $("body").css({"background-color": status[response].background})
        }

}