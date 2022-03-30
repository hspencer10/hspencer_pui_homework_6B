// Calendar functions
function Event (start, end) {
    this.start = start;
    this.end = end;
    this.width = null;
    this.height = null;
}
  
var eventList = [
    {start: 30, end: 150},
    {start: 540, end: 600},
    {start: 560, end: 620},
    {start: 610, end: 670}
];
  
function layOutDay(events) {
    var calendar = document.getElementById('calendar-view');
    
    for(var i = 0; i < events.length; i++) {
      drawEvent(calendar, events[i].start, events[i].end, 'Sample Item', 'Sample Location');
    }
}
  
function drawEvent(view, start, end, title, location) {
    var newEvent = document.createElement('div');
    newEvent.className = 'event';
    newEvent.style.top = start + "px";
    newEvent.style.height = (end - start) + "px";
    newEvent.style.width = "600px";
    
    var eventTitle = document.createElement('div');
    eventTitle.className = 'event-title';
    eventTitle.innerHTML = title;
    
    var eventLocation = document.createElement('span');
    eventLocation.className = 'event-location';
    eventLocation.innerHTML = location;
    
    newEvent.appendChild(eventTitle);
    newEvent.appendChild(eventLocation);
    
    view.appendChild(newEvent);
}

// Removing Popup
// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModalSwitch");

// Get the button that opens the modal
var btn = document.getElementById("modalBTN");
var btn2 = document.getElementById("modalSwitch");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
modal.style.display = "none";
modal2.style.display = "none";

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}
btn2.onclick = function() {
    modal2.style.display = "block";
  }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  closeModal();
}
span2.onclick = function() {
    closeModal();
  }

function closeModal() {
    modal.style.display = "none";
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  else if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

// Switching sections
function switchSection(courseNum, courseName){
    var table = document.querySelector('#schedule');

    updateSection();
    table.rows[newIndexes[0].row].cells[newIndexes[0].col].classList.add(courseNum);
    table.rows[newIndexes[1].row].cells[newIndexes[1].col].classList.add(courseNum);
    table.rows[newIndexes[0].row].cells[newIndexes[0].col].setAttribute('id', 'selected');
    table.rows[newIndexes[1].row].cells[newIndexes[1].col].setAttribute('id', 'selected');
    table.rows[newIndexes[0].row].cells[newIndexes[0].col].textContent = courseName;
    table.rows[newIndexes[1].row].cells[newIndexes[1].col].textContent = courseName;
    table.rows[oldIndexes[0].row].cells[oldIndexes[0].col].classList.remove(courseNum);
    table.rows[oldIndexes[1].row].cells[oldIndexes[1].col].classList.remove(courseNum);
    table.rows[oldIndexes[0].row].cells[oldIndexes[0].col].removeAttribute('id');
    table.rows[oldIndexes[1].row].cells[oldIndexes[1].col].removeAttribute('id');
    table.rows[oldIndexes[0].row].cells[oldIndexes[0].col].textContent = "";
    table.rows[oldIndexes[1].row].cells[oldIndexes[1].col].textContent = "";
    closeModal();
}

function updateSection() {
    var ele = document.getElementsByName('sections');
      
    oldIndexes = newIndexes;

    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
        document.getElementById("selection").innerHTML
                = "Section: "+ele[i].value;
        }
    }

    if(document.getElementById("selection").innerHTML == "Section: A"){
        newIndexes = [{row: 1, col: 1}, {row: 2, col: 3}];
    }else if(document.getElementById("selection").innerHTML == "Section: B"){
        newIndexes = [{row: 2, col: 0}, {row: 3, col: 2}];
    }else{
        newIndexes = [{row: 4, col: 3}, {row: 1, col: 4}];
    }
}

function removeSection(courseNum) {
    var table = document.querySelector('#schedule');

    table.rows[newIndexes[0].row].cells[newIndexes[0].col].classList.remove(courseNum);
    table.rows[newIndexes[1].row].cells[newIndexes[1].col].classList.remove(courseNum);
    table.rows[newIndexes[0].row].cells[newIndexes[0].col].removeAttribute('id');
    table.rows[newIndexes[1].row].cells[newIndexes[1].col].removeAttribute('id');
    table.rows[newIndexes[0].row].cells[newIndexes[0].col].textContent = "";
    table.rows[newIndexes[1].row].cells[newIndexes[1].col].textContent = "";
    document.getElementById("selection").innerHTML = "Section: ";
    closeModal();
}
  