window.addEventListener("scroll",()=>{
    let header = document.querySelector("header");
    header.classList.toggle("navbarjs", window.scrollY>150); 
})

let hamburger=document.querySelector('.hamburger');
let nav=document.querySelector('nav');
let header=document.querySelector('header');

hamburger.addEventListener("click",()=>{
    header.classList.toggle('active');
    nav.classList.toggle('active');
})

let link=document.querySelectorAll('a').forEach(element =>element.addEventListener('click',()=>{
    header.classList.remove('active');
    nav.classList.remove('active');
}))