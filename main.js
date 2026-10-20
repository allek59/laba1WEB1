const body=document.body;const themeButton=document.querySelector('.theme-toggle');try{if(localStorage.getItem('kelan-theme')==='dark')body.classList.add('dark')}catch(e){}function updateTheme(){themeButton.textContent=body.classList.contains('dark')?'☀':'☾';themeButton.setAttribute('aria-label',body.classList.contains('dark')?'Включить светлую тему':'Включить тёмную тему')}updateTheme();themeButton.addEventListener('click',()=>{body.classList.toggle('dark');updateTheme();try{localStorage.setItem('kelan-theme',body.classList.contains('dark')?'dark':'light')}catch(e){}});
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Открыть меню')}menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const cards=[...document.querySelectorAll('.project-card')];document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});let visible=0;cards.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)visible++});document.querySelector('#no-projects').hidden=visible!==0}));
// Авторские иллюстрации Александры Поповой (kelan).
const slides=[
  {src:'assets/illustration-01.jpg',title:'Иллюстрация 01'},
  {src:'assets/illustration-02.jpg',title:'Иллюстрация 02'},
  {src:'assets/illustration-03.jpg',title:'Иллюстрация 03'},
  {src:'assets/illustration-04.jpg',title:'Иллюстрация 04'},
  {src:'assets/illustration-05.jpg',title:'Иллюстрация 05'},
  {src:'assets/illustration-06.jpg',title:'Иллюстрация 06'},
  {src:'assets/illustration-07.jpg',title:'Иллюстрация 07'}
];
let slideIndex=0;
const track=document.querySelector('#gallery-track');
const dots=document.querySelector('.gallery-dots');
slides.forEach((slide,i)=>{
  const dot=document.createElement('button');
  dot.type='button';
  dot.setAttribute('aria-label',`Показать иллюстрацию ${i+1}`);
  dot.addEventListener('click',()=>showSlide(i));
  dots.append(dot);
});
function visibleSlides(){return window.matchMedia('(min-width: 850px)').matches?3:1;}
function showSlide(index){
  slideIndex=(index+slides.length)%slides.length;
  track.replaceChildren();
  for(let offset=0;offset<visibleSlides();offset++){
    const i=(slideIndex+offset)%slides.length;
    const slide=slides[i];
    const figure=document.createElement('figure');
    figure.className='gallery-card';
    const img=document.createElement('img');
    img.src=slide.src;img.alt=`Авторская работа Александры Поповой, иллюстрация ${i+1}`;img.loading='lazy';
    const caption=document.createElement('figcaption');
    caption.textContent=slide.title;
    figure.append(img,caption);track.append(figure);
  }
  [...dots.children].forEach((dot,i)=>{
    dot.classList.toggle('active',i===slideIndex);
    dot.setAttribute('aria-current',String(i===slideIndex));
  });
}
let galleryTimer=null;function startGalleryTimer(){if(galleryTimer)clearInterval(galleryTimer);galleryTimer=setInterval(()=>{if(!document.hidden)showSlide(slideIndex+1)},3000)}
document.querySelector('.prev').addEventListener('click',()=>showSlide(slideIndex-1));
document.querySelector('.next').addEventListener('click',()=>showSlide(slideIndex+1));
window.addEventListener('resize',()=>{if(track.children.length!==visibleSlides())showSlide(slideIndex)});
showSlide(0);startGalleryTimer();

// Ссылки на социальные сети активируются после заполнения contacts.js.
document.querySelectorAll('[data-social]').forEach(link=>{
 const url=window.kelanContacts?.[link.dataset.social];
 if(typeof url==='string' && /^https:\/\/(t\.me|telegram\.me|www\.tiktok\.com|tiktok\.com)\//i.test(url)){
   link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.removeAttribute('aria-disabled');
 }else{link.addEventListener('click',event=>event.preventDefault());}
});
// Анимация появления секций с учётом предпочтения уменьшенного движения.
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08});
 document.querySelectorAll('.section').forEach(section=>{section.classList.add('reveal');observer.observe(section)});
}
