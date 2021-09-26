var checkIcon = document.getElementById('icon');
var container2 = document.getElementsByClassName('container2')[0];
var i = 0;


const targetContainer = document.querySelector('.container2');


getEventListeners();

function getEventListeners(){
    document.addEventListener('DOMContentLoaded', getNotes);
    checkIcon.addEventListener('click', displayNote);
}

//DISPLAY NOTES FROM LS
function getNotes(){
    let notes;
    if (localStorage.getItem('notes') === null){
        notes = [];
        }
        else{
           notes = JSON.parse(localStorage.getItem('notes'));
        }

        notes.forEach(function(note){
            const node0 = document.createElement('div');
            const node1 = document.createElement('p'); 
            node1.className = 'usersNote'; 
           
            const a = document.createElement('a');
            a.className = 'deleteNote';
            a.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i> <br>`;
    
            node1.textContent = note;
            
            node1.style.transform = rotateNotes();
            node1.style.background = color();

            node0.appendChild(node1);
 
    
    
           container2.insertAdjacentElement('beforeend',node0);
           node1.insertAdjacentElement('afterbegin',a);

    
        node0.addEventListener("mouseenter", function(){
           node0.style.borderRadius = "50px";


    //REMOVE FROM DOM 
    a.addEventListener('click', removeNote);
    
    });
        })
}

//DISPLAY NOTES IN DOM
function displayNote(){
    const noteValue = document.getElementById('text_input').value;

    const node0 = document.createElement('div');
    const node1 = document.createElement('p'); 
    node1.className = 'usersNote'; 
   
    const a = document.createElement('a');
    a.className = 'deleteNote';
    a.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i> <br>`;

    node1.textContent += noteValue;
    updateStorage(noteValue);

    node1.style.transform = rotateNotes();
    node1.style.background = color();

    node0.appendChild(node1);



   container2.insertAdjacentElement('beforeend',node0);
   node1.insertAdjacentElement('afterbegin',a);


   node0.addEventListener("mouseenter", function(){
       node0.style.borderRadius = "50px";});


    document.getElementById('text_input').value = '';

    //REMOVE FROM DOM 
    a.addEventListener('click', removeNote);
}

function rotateNotes(){
    var rotate_notes = ['rotate(3deg)','rotate(5deg)','rotate(1deg)','rotate(-5deg)', 'rotate(-3deg)', 'rotate(-1deg)'];

    return rotate_notes[Math.floor(Math.random() * rotate_notes.length)]
}

function color(){
    var note_color = ['#c0c0c0', '#8b4513', '#e6e6fa', '#d8bfd8', '#afeeee'];

    if (i > note_color.length - 1){
        i = 0;
    } 

    return note_color[i++];
}

 //ADD TO LS
function updateStorage(note){
     let notes;
    if (localStorage.getItem('notes') === null){
        notes = [];}
        else{
           notes = JSON.parse(localStorage.getItem('notes'));
        }

         notes.push(note);

         localStorage.setItem('notes', JSON.stringify(notes));
}

//REMOVE NOTES FROM DOM
function removeNote(e){
    if(e.target){
        e.target.parentElement.parentElement.parentElement.remove();

        removeNotesFromLS(e.target.parentElement.parentElement);
    }
  }
    
//REMOVE NOTES FROM LS
function removeNotesFromLS(noteItem){

    let notes;
    if(localStorage.getItem('notes') === null){
     notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }

    
   notes.forEach(function(note, index){
      if(noteItem.textContent === note){
        notes.splice(index, 1);
      }  
   });
   
     
  
    localStorage.setItem('notes', JSON.stringify(notes));
}