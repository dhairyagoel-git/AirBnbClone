let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let btns=['red','yellow','purple','green'];
let h3= document.querySelector('h3');
let highscore=0;
let h4=document.querySelector('h4');

document.addEventListener('keypress',function(){
    if(started==false){
        started=true;
        levelup();
    }
});
function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove('flash');}
    ,200);
}
    

function levelup(){
    userSeq=[];
    level++;
    h3.innerText=`level ${level}`;
    //random button choose
    let rando=Math.floor(Math.random()*3);
    let randoColor=btns[rando];
    gameSeq.push(randoColor);
    console.log(gameSeq);
    let randbutton=document.querySelector(`.${randoColor}`);
    btnflash(randbutton);
}
function checkans(idx){

    if(gameSeq[idx]==userSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup,1000)    ;              
        }
    }
    else{
        h3.innerHTML=`Game over! your score was <b>${gameSeq.length}</b><br>
        Press any key to reset.`;
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor='white';
        }, 150);
        if(gameSeq.length>highscore){
            highscore=gameSeq.length;
        }
        reset();

    }
    function reset(){
        started=false;
        level=0;
        gameSeq=[];
        userSeq=[];
    }
}
function btnpress(){
    console.log(this);
    let btn=this;
    btnflash(btn);
    let usercolor=btn.getAttribute('id');
    userSeq.push(usercolor);
    console.log(userSeq);
    checkans(userSeq.length-1);
}
let allBtns= document.querySelectorAll('.button');
for(allBtn of allBtns){
    allBtn.addEventListener('click',btnpress);
}
let button2=document.querySelector('button');
button2.addEventListener('click',function(){
    h4.innerText=highscore;
})