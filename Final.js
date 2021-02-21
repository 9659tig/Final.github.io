const clock = document.querySelector('h1'),
 nameform = document.querySelector('.name'),
 nameinput = nameform.querySelector('input'),
 welcome = document.querySelector('h3'),
 todoform = document.querySelector('.todo'),
 todoinput = todoform.querySelector('input'),
 willul = document.querySelector('.will'),
 endul = document.querySelector('.end'),
 body = document.querySelector('body'),
 coment = document.querySelector('.coment'),
 section=document.querySelector('section')
 countImg = 3,
 toDolist="TodoList",
 donelist="Donelist",
 userName = "username";
let willarray=[],
endarray=[],
idnum = 1;
function ranImg(num){
  const img = new Image();
  img.src=`${num}.jpg`;
  img.classList.add('bgImg');
  body.appendChild(img);
}
function ranNum(){
  const number = Math.floor(Math.random()* countImg);
  return number;
}
function changeli(event){
  const btn = event.target;
  const li = btn.parentNode;
  if (btn.innerText==='❕'){
    willul.removeChild(li);
    endul.appendChild(li);
    const update2 = willarray.filter(function(todos){
      return todos.id === parseInt(li.id);
    })
    endarray.push(update2[0]);
    const update1 = willarray.filter(function(todos){
      return todos.id !== parseInt(li.id);
    });
    willarray = update1;
    btn.innerText = '❗';
  } else {
    endul.removeChild(li);
    willul.appendChild(li);
    const update2 = endarray.filter(function(todos){
      return todos.id === parseInt(li.id);
    })
    willarray.push(update2[0]);
    const update1 = endarray.filter(function(todos){
      return todos.id !== parseInt(li.id);
    });
    endarray = update1;
    btn.innerText = '❕';
  }
  savetodo();
}
function removeli(event) {
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode === willul) {
    willul.removeChild(li);
    const updateWill = willarray.filter(function(todos){
      return todos.id !== parseInt(li.id);
    })
    willarray = updateWill;
  } else {
    endul.removeChild(li);
    const updateEnd = endarray.filter(function(todos){
      return todos.id !== parseInt(li.id);
    })
    endarray = updateEnd;
  }
  savetodo();
}
function savetodo(){
  localStorage.setItem(toDolist,JSON.stringify(willarray));
  localStorage.setItem(donelist,JSON.stringify(endarray));
}
function makeTodo(text){
  const li = document.createElement('li'),
   span = document.createElement('span'),
   finBtn = document.createElement('button'),
   delBtn = document.createElement('button');
  span.innerText = text;
  finBtn.innerText = '❕';
  finBtn.addEventListener('click', changeli);
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', removeli);
  li.appendChild(span);
  li.appendChild(finBtn);
  li.appendChild(delBtn);
  const newid = idnum;
  li.id = newid;
  idnum += 1;
  todoObj={
    text : text,
    id : newid
  };
  willul.appendChild(li);
  willarray.push(todoObj);
}
function makeFinTodo(text){
  const li = document.createElement('li'),
   span = document.createElement('span'),
   finBtn = document.createElement('button'),
   delBtn = document.createElement('button');
  span.innerText = text;
  finBtn.innerText = '❗';
  finBtn.addEventListener('click', changeli);
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', removeli);
  li.appendChild(span);
  li.appendChild(finBtn);
  li.appendChild(delBtn);
  const newid = idnum;
  li.id = newid;
  idnum += 1;
  todoObj={
    text : text,
    id : newid
  };
  endul.appendChild(li);
  endarray.push(todoObj);
}
 function makelist(event){
   event.preventDefault();
   const task = todoinput.value;
   makeTodo(task);
   savetodo();
   todoinput.value='';
 }
 function isItList(){
   if (localStorage.getItem(toDolist)!== null) {
     const toDo = JSON.parse(localStorage.getItem(toDolist));
     toDo.forEach(function(todo) {
       makeTodo(todo.text);
     });
   }
   if (localStorage.getItem(donelist)!==null) {
     const done = JSON.parse(localStorage.getItem(donelist));
     done.forEach(function(todo){
       makeFinTodo(todo.text);
     });
   }
 }
 function inputname(event){
   event.preventDefault();
   localStorage.setItem(userName, nameinput.value);
   showname(nameinput.value);
 }
function showname(text){
  nameform.classList.remove('showing');
  welcome.innerText=`Hello ${text}!`
  welcome.classList.add('showing');
  coment.classList.add('showing');
  section.classList.add('showing');
}
function isItName(){
  const username = localStorage.getItem(userName);
  if (username===null) {
    welcome.classList.remove('showing');
    nameform.classList.add('showing');
    nameform.addEventListener('submit',inputname);
  } else{
    showname(username);
  }
}
function showclock(){
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clock.innerText=`${hours<10? `0${hours}`:hours} : ${minutes<10? `0${minutes}`:minutes} : ${seconds<10? `0${seconds}`:seconds}`;
}
function init(){
  showclock();
  setInterval( showclock, 1000);
  isItName();
  isItList();
  todoform.addEventListener('submit', makelist);
  ranImg(ranNum());
}
init();
