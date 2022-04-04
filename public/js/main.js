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

//----------------------------------------------------------------------------------------------------

// Loads the current courses for a user
//Store the courses a student is taking in localStorage
const class_dict = [];
const storedCourses = JSON.parse(localStorage.getItem('class_list'));
const class_list = storedCourses ? storedCourses : ['57-132', '67-443', '67-373'];

function loadCurrentCourses(){
  //Grab the current course numbers enrolled in
  var courseNums = [];
  var eventContainer = document.getElementsByClassName("calendar-view")[0];
  eventContainer.innerHTML = "";
  for(let i = 0; i < currentCourses.length; i++){
    courseNums.push(currentCourses[i].courseNum);
  }
  console.log(courseNums);
  localStorage.setItem('class_list', JSON.stringify(courseNums));
 
  //Display the widgets
  for(let i = 0; i < currentCourses.length; i++){
    renderEvent(currentCourses[i], eventContainer);
  }
}

//Renders the event with the appropriate variables
function renderEvent(evt, eventContainer) {
  const colors = [
    "red",
    "green",
    "darkgreen",
    "darkred",
    "darkblue",
    "darkcyan",
    "maroon",
    "midnightblue",
    "teal",
    "darkslategray",
    "mediumblue"
  ];
  //Creates the element
  var oneEvent = document.createElement("div");
  var link = document.createElement("a");
  var linkText = document.createTextNode("Details");
  var eventStatus = document.createElement("div");
  var eventName = document.createElement("div");
  var eventTitle = document.createElement("div");
  const color = Math.floor(Math.random() * colors.length);
  eventName.innerHTML = `${evt.courseNum}`;
  eventTitle.innerHTML = `${evt.title}`;

  link.setAttribute('href', "mobile_detail.html");
  link.setAttribute("class", "event-name");
  link.setAttribute("onclick", 'passCourseNum('+evt.courseNum+')');
  link.appendChild(linkText);
  oneEvent.appendChild(eventStatus);
  oneEvent.appendChild(eventName);
  oneEvent.appendChild(eventTitle);
  oneEvent.appendChild(link);
  eventName.setAttribute("class", "event-name");
  eventTitle.setAttribute("class", "event-name");
  eventStatus.setAttribute("class", "event-status");
  oneEvent.setAttribute("class", "slot");

  /**
   * if two events have same start time
   */
  oneEvent.style.background = colors[color];
  oneEvent.style.width = evt.width + "%";
  oneEvent.style.left = evt.left + "%";
  oneEvent.style.zIndex = evt.zindex;
  oneEvent.style.height = getHeight(evt.startTime, evt.endTime) + "px";
  // 100 / ((8-colPos))
  oneEvent.style.gridColumnStart = getColumnPosition(evt.dayOfWeek);
  oneEvent.style.gridRowStart = getRowPosition(evt.startTime);

  // add to event container
  eventContainer.appendChild(oneEvent);
}

//Helper functions to help determine grid column/row
function getHeight(starttime, endtime) {
  const starthour = starttime.split(":")[0];
  const startmin = starttime.split(":")[1];
  const endhour = endtime.split(":")[0];
  const endmin = endtime.split(":")[1];

  var datestart = new Date();
  var dateend = new Date();
  datestart.setHours(parseInt(starthour));
  datestart.setMinutes(parseInt(startmin));

  dateend.setHours(parseInt(endhour));
  dateend.setMinutes(parseInt(endmin));

  var duration = Math.abs(datestart.valueOf() - dateend.valueOf()) / 1000;
  return duration / 60;
}

function getColumnPosition(weekday) {
  if(weekday == 'Monday'){
    return 1;
  } else if(weekday =='Tuesday'){
    return 2;
  } else if(weekday =='Wednesday'){
    return 3;
  } else if(weekday =='Thursday'){
    return 4;
  } else {
    return 5;
  }
}

function getRowPosition(starttime) {
  console.log(starttime);
  const h = +starttime.split(":")[0];
  const m = +starttime.split(":")[1];
  console.log(h, m);
  const totalMinutes = Math.abs(8 - h) * 60 + m;
  const rowPos = totalMinutes /15 + 1;

  return rowPos;
}

//---------------------------------------------------------------------------------

//Populating the course detail template page with accurate info
function passCourseNum(num){
  console.log(num);
  window.addEventListener('load', courseDetails(num));
}

function courseDetails(courseNum){
  var course = currentCourses.find(e => e.courseNum === courseNum);
  var head = course.courseNum + " " + course.title;
  var req = course.fulfilled;
  var prof = course.professor;
  var section = course.section;
  var units = course.units;
  var fce = course.fce;
  var desc = course.description;
  var reqs = document.createElement("span");
  reqs.setAttribute("class", "reqs-filled");
  reqs.setAttribute("data-hover", 'Requiremnents fulfilled: '+req+'');
  var img = document.createElement("img")
  img.setAttribute("src", "images/green_check.png");
  reqs.appendChild(img);

  document.getElementById("class_title").innerHTML = head;
  document.getElementById("class_title").appendChild(reqs);
  document.getElementById("courseProf").innerHTML = "Prof: " + prof;
  document.getElementById("courseSection").innerHTML = "Section: " + section;
  document.getElementById("courseUnits").innerHTML = "Units: " + units;
  document.getElementById("courseFCE").innerHTML = "FCEs: " + fce;
  document.getElementById("courseDesc").innerHTML = "Description: " + desc;

}

//Function for grabbing the indices of the mini-calendar
function populateCalendarView(){
  var classInfo = [];
  var table = document.querySelector('#schedule');
  var courseNums = JSON.parse(localStorage.getItem("class_list"));
  for(let i = 0; i < courseNums.length; i++){
    classInfo.push(currentCourses.find(e => e.courseNum === courseNums[i]));
  }

  //Formatting the data cells to display the courses
  var elementClassName = ["one", "two", "three"];
  for(let j = 0; j < classInfo.length; j++){
    let c1 = classInfo[j].index[0].col;
    let r1 = classInfo[j].index[0].row;
    let c2 = classInfo[j].index[1].col;
    let r2 = classInfo[j].index[1].row;
    let num = classInfo[j].courseNum;
    let className = elementClassName[j];
    table.rows[r1].cells[c1].classList.add(num);
    table.rows[r2].cells[c2].classList.add(num);
    table.rows[r1].cells[c1].setAttribute('class', ''+className+'');
    table.rows[r2].cells[c2].setAttribute('class', ''+className+'');
    table.rows[r1].cells[c1].textContent = num;
    table.rows[r2].cells[c2].textContent = num;
  }

  console.log(classInfo);

}