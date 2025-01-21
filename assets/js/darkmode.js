let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')
let buttons = document.querySelectorAll('.btn');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'enable');
    buttons.forEach(button => {
        button.classList.add('btn-info');
        button.classList.remove('btn-success');
    });

}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
    buttons.forEach(button => {
        button.classList.add('btn-success');
        button.classList.remove('btn-info');
    });

}

if(darkmode === "enable") enableDarkmode()

themeSwitch.addEventListener("click", () => {  
    darkmode = localStorage.getItem('darkmode')
    if(darkmode !== "enable"){
        enableDarkmode()
    }
    else{
        disableDarkmode()
    }
});