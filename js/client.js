//socket, form, msdinp, 

const socket= io.connect('http://localhost:8000');
const form =document.getElementById('formid');
const msginp =document.getElementById('msginp');
const chatContainerID =document.getElementById('chatContainerID');
const nam =prompt("enter your name to join");
var audio= new Audio('../assets/ping.mp3');

const appendd =(msg, pos)=>{
    const msgEle=document.createElement('div');
    msgEle.innerHTML=msg;
    msgEle.classList.add('msg');
    msgEle.classList.add(pos);
    chatContainerID.append(msgEle);

    if(pos=='left'){
        audio.play();
    }
}
 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg=msginp.value;
    appendd(`You : ${msg}`,'right');
    socket.emit('send', msg);
    msginp.value='';

});

socket.emit('new-user-arrived', nam );

socket.on('user-joined',nam=>{
    appendd(`${nam}joinedchat`, 'right');
});

socket.on('recieve',data=>{
    appendd(`${data.name}: ${data.message}`,'left');
});

socket.on('left',name=>{
    appendd(`${name} left the chat`,'left');
});


