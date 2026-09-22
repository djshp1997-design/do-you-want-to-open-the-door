const images=Array.from({length:23},(_,i)=>`images/page${String(i+1).padStart(2,"0")}.jpg`);
let spread=0;

const left=document.getElementById("leftImage");
const right=document.getElementById("rightImage");
const book=document.getElementById("book");
const num=document.getElementById("pageNumber");

function update(){
  const a=spread*2,b=a+1;
  left.src=images[a];
  left.alt=`Page ${a+1}`;
  left.style.display="block";

  if(b<images.length){
    right.src=images[b];
    right.alt=`Page ${b+1}`;
    right.style.display="block";
  }else{
    right.style.display="none";
  }

  num.textContent=`${String(a+1).padStart(2,"0")} — ${String(Math.min(b+1,23)).padStart(2,"0")} / 23`;
}

function turn(direction){
  if(direction==="next"&&spread>=11)return;
  if(direction==="prev"&&spread<=0)return;

  book.classList.remove("turn-next","turn-prev");
  void book.offsetWidth;
  book.classList.add(direction==="next"?"turn-next":"turn-prev");

  setTimeout(()=>{
    spread+=direction==="next"?1:-1;
    update();
    book.classList.remove("turn-next","turn-prev");
  },380);
}

document.getElementById("next").onclick=()=>turn("next");
document.getElementById("previous").onclick=()=>turn("prev");

book.onclick=e=>{
  const r=book.getBoundingClientRect();
  turn(e.clientX-r.left>r.width/2?"next":"prev");
};

document.onkeydown=e=>{
  if(e.key==="ArrowRight")turn("next");
  if(e.key==="ArrowLeft")turn("prev");
};

let startX=0;
book.ontouchstart=e=>startX=e.changedTouches[0].clientX;
book.ontouchend=e=>{
  const d=e.changedTouches[0].clientX-startX;
  if(Math.abs(d)>50)turn(d<0?"next":"prev");
};

update();
