let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'enable');
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
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