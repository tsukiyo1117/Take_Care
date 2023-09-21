"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
$("#sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    //var li = document.createElement("li");
    let txt = $("#messagesList").val() + "\n" + user + " : " + message;
    $("#messagesList").val(txt);
    //document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    //li.textContent = `${user} says ${message}`;
});
$(document).ready(function () {
    $("#messageInput").keypress(function (e) {
        var key = window.event ? e.keyCode : e.which;
        if (key == 13) {
            $("#sendButton").click();
        }
    })
}
)

connection.start().then(function () {
    $("#sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

$("#sendButton").on("click", function (event) {
    if (document.getElementById("messageInput").value != "") {
        let targetConnectionId = "";
        let user = document.getElementById("userInput").value;
        let message = document.getElementById("messageInput").value;
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById("messageInput").value = "";
        event.preventDefault();
    }
});
$("#showChat").on("click", function () {
    $(".chatbox").show();
    $("#showChat").hide();
})
$("#hideChat").on("click", function () {
    $(".chatbox").hide();
    $("#showChat").show();
})