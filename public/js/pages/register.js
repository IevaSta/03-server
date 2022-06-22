const formDOM = document.querySelector('.form');
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');

if (submitDOM) {
    submitDOM.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Siunciama informacija')
        console.log(inputsDOM);
    })
}