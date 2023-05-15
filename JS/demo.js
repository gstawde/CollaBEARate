/*
 * Copyright Gargi Tawde (c) 2023.
 */

var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ( username == "test0" && password == "test"){
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function() {
            window.location = "../HTML/userDashboardPage.html"; // Redirecting to other page.
            return false;
        }, delayInMilliseconds);


    }
    else{
        attempt --;// Decrementing by one.
        alert("You have "+attempt+" attempt(s) left");
// Disabling fields after 3 attempts.
        if( attempt == 0){
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}
