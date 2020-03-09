const form = document.querySelector(".jsForm"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".jsGreetings");

// local storage

const USER_LS="currentUser",
    SHOWING_CN = "showing";
    


function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
    // form의 submit 이벤트 발생시 default(전달, 새로고침...)을 바꿔주는 것
    // submit 이벤트가 일어나면 리스너가 전달받아 default로 설정된 함수 대신 새로운 함수를 호출한다.
}    

function paintGreeting(text) {
    let hello = gethello();
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${hello}, ${text}.`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function gethello() {
    const date = new Date();
    const hours = date.getHours();
    // “Good morning” is generally used from 5:00 a.m. to 12:00 p.m. 
    // “Good afternoon” is appropriate for a period from 12:00 p.m. to 6:00 p.m. 
    // “Good evening” is often used after 6 p.m
    if(hours >= 5) {hello = "Good morning";}
    if(hours >= 12) {hello = "Good afternoon";}
    if(hours >= 18 || hours < 5) {hello = "Good evening";}
    return hello;
}



function init() {
    loadName();
}

init();