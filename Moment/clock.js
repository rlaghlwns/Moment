const clockContainer = document.querySelector(".jsClock"),
 clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    // clockTitle.innerText = `${hours}:${minutes}:${seconds}`
    clockTitle.innerText = 
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

// setInterval(fn, 1000)
// fn = 함수    1000 = 실행간격(밀리세컨드)

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();