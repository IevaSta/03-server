import { IsValid } from "../components/isValid.js";

const formDOM = document.querySelector('.form');
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', (e) => {
        e.preventDefault();

        const data = {};

        notificationsDOM.classList.remove('show');
        notificationsDOM.innerText = '';

        for (const inputDOM of inputsDOM) {
            if (inputDOM.type !== 'checkbox') {
                const rule = inputDOM.dataset.validation;
                const result = IsValid[rule](inputDOM.value);
                if (result === true) {
                    data[inputDOM.name] = inputDOM.value;
                } else {
                    notificationsDOM.classList.add('show');
                    notificationsDOM.innerHTML += `<p>${result}</p>`;
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;
            }
        }
        console.log(data);
    })
}