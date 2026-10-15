'use strict';
const cartoons = [
  {name:'O Incrível Mundo de Gumball',image:'gumball.jpg',category:'Uma família nada comum',universe:'Elmore',feeling:'Caos, família e imaginação',description:'Um gato azul, um peixe de pernas e uma família que transforma o dia mais comum em uma aventura absurda. Em Elmore, ser diferente é a melhor parte.',alt:'Gumball e os personagens de O Incrível Mundo de Gumball'},
  {name:'Gravity Falls',image:'gravity-falls.jpg',category:'Só mais um mistério',universe:'Gravity Falls',feeling:'Mistério e laços de família',description:'Um verão, dois irmãos e uma cidade cheia de segredos. Dipper e Mabel lembram que crescer é uma aventura ainda melhor quando a gente tem companhia.',alt:'Personagens de Gravity Falls'},
  {name:'Shrek',image:'shrek.jpg',category:'Era uma vez, do avesso',universe:'Tão Tão Distante',feeling:'Amizade e autoaceitação',description:'Um ogro, um burro falante e um conto de fadas fora do roteiro. Uma história sobre encontrar a sua turma e descobrir a beleza de ser quem você é.',alt:'Shrek e os personagens de seu conto de fadas'},
  {name:'Mickey Mouse',image:'mickey.jpg',category:'Uma magia que atravessa gerações',universe:'O mundo de Mickey',feeling:'Otimismo e boas amizades',description:'Duas orelhas redondas e um mundo de possibilidades. Com Minnie, Donald, Pateta e Pluto, Mickey transforma pequenas confusões em grandes lembranças.',alt:'Mickey Mouse e sua turma'},
  {name:'Hora de Aventura',image:'hora-de-aventura.jpg',category:'A diversão nunca acaba',universe:'Terra de Ooo',feeling:'Aventura e companheirismo',description:'Finn e Jake partem por um mundo onde tudo pode acontecer. Entre reinos doces e criaturas improváveis, cabe muita coragem, amizade e coração.',alt:'Finn e Jake de Hora de Aventura'},
  {name:'Bob Esponja',image:'bob-esponja.jpg',category:'Estou pronto! Estou pronto!',universe:'Fenda do Biquíni',feeling:'Alegria nas pequenas coisas',description:'No fundo do mar, uma esponja encontra alegria em fazer hambúrgueres, caçar águas-vivas e estar com os amigos. O cotidiano nunca pareceu tão divertido.',alt:'Bob Esponja e os habitantes da Fenda do Biquíni'},
  {name:'Scooby-Doo',image:'scooby-doo.jpg',category:'Mistério com um lanche no final',universe:'A bordo da Máquina de Mistério',feeling:'Coragem e trabalho em equipe',description:'Uma van, uma turma inseparável e um cachorro que ama biscoitos. Até o maior susto fica menor quando os amigos estão por perto.',alt:'Scooby-Doo e a turma da Máquina de Mistério'},
  {name:'Tom e Jerry',image:'tom-e-jerry.jpg',category:'Uma dupla, mil confusões',universe:'Uma casa nada tranquila',feeling:'Risadas sem precisar de palavras',description:'Um gato, um rato e uma perseguição que nunca perde a graça. Entre armadilhas e reviravoltas, a dupla fez gerações rirem sem precisar dizer quase nada.',alt:'Tom e Jerry'},
  {name:'As Meninas Superpoderosas',image:'meninas-superpoderosas.jpg',category:'O dia foi salvo mais uma vez',universe:'Townsville',feeling:'Personalidade e união',description:'Florzinha, Lindinha e Docinho têm jeitos diferentes e uma missão em comum. Juntas, provam que o tamanho de uma heroína não mede a sua força.',alt:'Florzinha, Lindinha e Docinho, as Meninas Superpoderosas'},
  {name:'Coragem, o Cão Covarde',image:'coragem.jpg',category:'O que a gente faz por amor',universe:'Lugar Nenhum',feeling:'Afeto maior que o medo',description:'No meio do nada, um cão medroso enfrenta o inexplicável para proteger Muriel. Porque coragem também é sentir medo e ir mesmo assim.',alt:'Coragem, o Cão Covarde, e sua família'}
];
let activeIndex = 0;
const imageStack = document.getElementById('image-stack');
const stories = document.getElementById('carousel-stories');
const pagination = document.getElementById('pagination');
const carousel = document.querySelector('.carousel');
cartoons.forEach((cartoon,index)=>{
  const figure = document.createElement('figure');
  figure.className='cartoon-image';
  const image=document.createElement('img');
  image.src=`assets/${cartoon.image}`;image.alt=cartoon.alt;image.loading='lazy';image.draggable=false;
  figure.append(image);imageStack.append(figure);
  const story=document.createElement('button');
  story.type='button';story.className='cartoon-story';story.setAttribute('aria-label',`Ver ${cartoon.name}`);
  const category=document.createElement('span');category.className='story-category';category.textContent=cartoon.category;
  const name=document.createElement('h3');name.textContent=cartoon.name;
  const divider=document.createElement('span');divider.className='story-divider';divider.setAttribute('aria-hidden','true');
  const description=document.createElement('p');description.textContent=cartoon.description;
  story.append(category,name,divider,description);stories.append(story);
  story.addEventListener('click',()=>showCartoon(index));
  const dot=document.createElement('button');dot.type='button';dot.className='page-dot';dot.setAttribute('aria-label',`Desenho ${index+1}: ${cartoon.name}`);dot.addEventListener('click',()=>showCartoon(index));pagination.append(dot);
});
function showCartoon(index,announce=true){
  activeIndex=(index+cartoons.length)%cartoons.length;
  const previous=(activeIndex-1+cartoons.length)%cartoons.length;
  const next=(activeIndex+1)%cartoons.length;
  for(let i=0;i<cartoons.length;i++){
    const slot=i===activeIndex?'0':i===previous?'-1':i===next?'1':'hidden';
    imageStack.children[i].dataset.slot=slot;
    imageStack.children[i].setAttribute('aria-hidden',String(i!==activeIndex));
    stories.children[i].dataset.slot=slot;
    stories.children[i].tabIndex=i===previous||i===next?0:-1;
    stories.children[i].setAttribute('aria-hidden',String(slot==='hidden'));
    pagination.children[i].setAttribute('aria-current',String(i===activeIndex));
  }
  const current=cartoons[activeIndex];
  document.getElementById('current-number').textContent=String(activeIndex+1).padStart(2,'0');
  document.getElementById('slide-universe').textContent=current.universe;
  document.getElementById('slide-feeling').textContent=current.feeling;
  if(announce)document.getElementById('carousel-announcement').textContent=`${activeIndex+1} de ${cartoons.length}: ${current.name}. ${current.description}`;
}
document.getElementById('previous').addEventListener('click',()=>showCartoon(activeIndex-1));
document.getElementById('next').addEventListener('click',()=>showCartoon(activeIndex+1));
// Keep the carousel in view while the mouse wheel moves through the collection.
// At either end, return scrolling to the page instead of looping or trapping it.
let wheelDistance=0;
let wheelDirection=0;
let lastWheelAt=0;
let lastWheelChange=-Infinity;
window.addEventListener('wheel',event=>{
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.defaultPrevented||!event.cancelable||Math.abs(event.deltaX)>Math.abs(event.deltaY)||event.deltaY===0)return;
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?window.innerHeight:1);
  const direction=Math.sign(delta);
  const rect=carousel.getBoundingClientRect();
  const offset=rect.top+rect.height/2-window.innerHeight/2;
  const centered=Math.abs(offset)<=80;
  const approaching=Math.sign(offset)===direction&&Math.abs(offset)<=Math.min(Math.abs(delta),180)+80;
  if(!centered&&!approaching){wheelDistance=0;return;}
  const now=performance.now();
  if(now-lastWheelAt>200||direction!==wheelDirection)wheelDistance=0;
  lastWheelAt=now;
  wheelDirection=direction;
  if(now-lastWheelChange<850){event.preventDefault();return;}
  if((direction<0&&activeIndex===0)||(direction>0&&activeIndex===cartoons.length-1)){wheelDistance=0;return;}
  event.preventDefault();
  if(Math.abs(offset)>1)window.scrollBy({top:offset,behavior:'instant'});
  wheelDistance+=delta;
  if(Math.abs(wheelDistance)>=45){
    showCartoon(activeIndex+direction);
    wheelDistance=0;
    lastWheelChange=now;
  }
},{passive:false});
carousel.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();showCartoon(activeIndex+(event.key==='ArrowRight'?1:-1));}
  if(event.key==='Home'){event.preventDefault();showCartoon(0);}
  if(event.key==='End'){event.preventDefault();showCartoon(cartoons.length-1);}
});
let gesture=null;
const stage=document.getElementById('carousel-stage');
stage.addEventListener('pointerdown',event=>{if(event.button!==0)return;gesture={x:event.clientX,y:event.clientY,id:event.pointerId};stage.setPointerCapture(event.pointerId);});
stage.addEventListener('pointerup',event=>{if(!gesture||gesture.id!==event.pointerId)return;const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))showCartoon(activeIndex+(dx<0?1:-1));gesture=null;});
stage.addEventListener('pointercancel',()=>{gesture=null;});
showCartoon(0,false);
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window){
  document.documentElement.classList.add('js-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
}
let scrollPending=false;
function updateScroll(){
  if(!reduceMotion.matches){const hero=document.querySelector('.hero');document.documentElement.style.setProperty('--scroll',Math.min(1,window.scrollY/hero.offsetHeight).toFixed(4));}
  scrollPending=false;
}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScroll);}},{passive:true});
updateScroll();
