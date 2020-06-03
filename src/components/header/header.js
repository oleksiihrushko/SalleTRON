// import './header.scss';

const btn = document.querySelector('.hamburger');

const toggleBurger = (e) => {
    if (!e.currentTarget) return;
    console.log(e.target.nodeName);
    if (e.currentTarget) {
    btn.classList.toggle('is-active')
    }

}
btn.addEventListener('click', toggleBurger);
