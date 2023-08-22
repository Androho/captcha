const modal = document.createElement('div')
const openModalBtn = document.getElementById('open-modal-btn')
const userBtn = document.getElementById('user-btn')
const API_url = 'api/index.php?id='
const main_url = 'http://captcha/'
const userFuncName = openModalBtn.dataset.userFunc
const user_id = openModalBtn.dataset.userId
let user_API = '', con


function createScript(uid) {
    let serv_script = document.createElement('script');
    serv_script.type = 'text/javascript';
    serv_script.src = main_url + 'users/' + uid + '/includes/main.js';
    document.body.appendChild(serv_script);
    let serv_style = document.createElement('link')
    serv_style.rel = 'stylesheet'
    serv_style.href = main_url + 'users/' + uid + '/includes/main.css'
    document.head.appendChild(serv_style)
}

function delScript(uid) {
    const head = document.querySelector("head");
    const url_h = main_url + 'users/' + uid + '/includes/main.css'
    const url_s = main_url + 'users/' + uid + '/includes/main.js'
    const links = document.querySelectorAll(`link[href='${url_h}']`);
    const scripts = document.querySelectorAll(`body script[src='${url_s}']`);
    const captcha_modal = document.getElementById('captcha_modal')
    links.forEach(link => {
        head.removeChild(link);
    });
    scripts.forEach(script => {
        script.parentNode.removeChild(script);
    });
    captcha_modal.remove()
    delete mobileInd
}

function getData(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            con = data.content
            showModal(con)
            ini(1)
        })
        .catch(function (error) {
            console.error("Request failed", error);
        });
}

function captcha_API(user_id) {
    createScript(user_id)
    user_API = main_url + API_url + user_id
    getData(user_API)
}

openModalBtn.addEventListener('click', () => {
    captcha_API(user_id);
});

function showModal(content) {
    modal.id = 'captcha_modal'
    modal.innerHTML = content;
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    // modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '9999';
    document.body.appendChild(modal);
}

function usFunc() {
    openModalBtn.style.display = 'none'
    userBtn.style.display = 'block'
    console.log('The function is executed upon successful completion of the captcha.')
    testFunc()
}

function testFunc() {
    console.log('testtesttest11111111111111111111111')
}
