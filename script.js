// display the current time
var current_time = document.getElementById("current_time");

// update time 
function update_time() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let time = hours + ":" + minutes + ":" + seconds;

    current_time.innerText = time;
    let t = setTimeout(function() {
        update_time()
        if(alarm_list.includes(time)) {
            ringing(time);
        }
    }, 1000)
}

update_time();

function format_time(time) {
    if (time < 10 && time.length != 2) {
        return "0" + time;
    }
    return time;
}
const list = document.querySelector(".set_alarms_list");
 
let alarm_list = [];
const userInput = document.querySelector(".user_input");
userInput.addEventListener("submit", function(e) {
    e.preventDefault();
    const hour = userInput.hour.value;
    const min = userInput.min.value;
    const sec = userInput.sec.value;
    let new_hour = format_time(hour);
    if(new_hour === "0") {
        new_hour = "00";
    }
    let new_minute = format_time(min);
    if(new_minute === "0") {
        new_minute = "00";
    }
    let new_second = format_time(sec);
    if(new_second === "0") {
        new_second = "00";
    }

    const new_alarm = `${new_hour}:${new_minute}:${new_second}`;
    if(isNaN(new_alarm)) {
        if(!alarm_list.includes(new_alarm)) {
            alarm_list.push(new_alarm);
            show_alarm(new_alarm);
            new_alarm.reset();
        }
        else {
            alert(`Aalram is already set`);
        }
    }
    else {
        alert("Invalid time");
    }
})

function show_alarm(new_alarm) {
    const html = `
        <li class="time_list">
            <span class="time" style="margin-right:50px">${new_alarm}</span>
            <button class="deleteAlarm time_control" id="delete_button" onclick="remove(this.value)" value=${new_alarm}>Delete</button>
        </li>
    `
    list.innerHTML += html;
}