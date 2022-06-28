import { IsValid } from "../components/isValid.js";

const formDOM = document.querySelector('.form');
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', (e) => {
        e.preventDefault();

        notificationsDOM.classList.remove('show');

        const data = {};
        const errors = [];

        for (const inputDOM of inputsDOM) {
            if (inputDOM.type !== 'checkbox') {
                const rule = inputDOM.dataset.validation;
                const [err, msg] = IsValid[rule](inputDOM.value);

                if (err) {
                    errors.push(msg);
                } else {
                    data[inputDOM.name] = inputDOM.value;
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;
                if (!inputDOM.checked) {
                    errors.push('Privaloma sutikti su TOS');
                }
            }
        }

        if (inputsDOM[2].value !== inputsDOM[3].value) {
            errors.push('Slaptazodziai nesutampa');
        }

        if (errors.length) {
            notificationsDOM.classList.add('show');
            notificationsDOM.innerText = errors.join('.\n') + '.';
        } else {
            console.log('KLAIDU NERASTA...');
            console.log('SIUNCIAM DUOMENIS I SERVERI...');
            console.log(data);
        }
    })
}