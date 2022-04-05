//Global Vars
const class_dict = [];
const storedCourses = JSON.parse(localStorage.getItem('class_list'));
const class_list = storedCourses ? storedCourses : ['57-132', '67-443', '67-373'];
const storedSects = JSON.parse(localStorage.getItem('classSection_list'));
const classSection_list = storedSects ? storedSects : [ {courseNum: "57-132", section: "1AE"}, {courseNum: "67-443", section: "2CD"}, {courseNum: "67-373", section: "3AB"}];

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
function switchSection(courseNum){
    console.log(courseNum);
    updateSection(courseNum);
    window.location.reload();
    closeModal();
}

function updateSection(courseNum) {
    var ele = document.getElementsByName('sections');
    var classSections = JSON.parse(localStorage.getItem('classSection_list'));
    var courseSection = classSections.find(e => e.courseNum === courseNum);
    var section = courseSection.section;

    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
          section = ele[i].value;
        }
    }

    //Updating local storage
    var newClassSections = [];
    for(let i = 0; i < classSections.length; i++){
      if(classSections[i].courseNum === courseNum){
        var s = section;
      }else{
        var s = classSections[i].section;
      }
      let classSect = {"courseNum": classSections[i].courseNum, "section": s};
      newClassSections.push(classSect);
    }

    console.log(newClassSections);
    localStorage.setItem('classSection_list', JSON.stringify(newClassSections));
}

function removeSection(courseNum) {
    var classSections = JSON.parse(localStorage.getItem('classSection_list'));
    var classNums = [];

    var newClassSections = [];
    for(let i = 0; i < classSections.length; i++){
      if(classSections[i].courseNum === courseNum){
        continue;
      }else{
        classNums.push(classSections[i].courseNum);
        let classSect = {"courseNum": classSections[i].courseNum, "section": classSections[i].section};
        newClassSections.push(classSect);
      }
    }

    console.log(classNums);
    localStorage.setItem('classSection_list', JSON.stringify(newClassSections));
    localStorage.setItem('class_list', JSON.stringify(classNums));
    closeModal();
    window.location.reload();
}

//----------------------------------------------------------------------------------------------------

// Loads the current courses for a user
//Store the courses a student is taking in localStorage

function loadCurrentCourses(){
  //Grab the current course numbers enrolled in
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
  var courseNums = [];
  var courseSections = [];
  var eventContainer = document.getElementsByClassName("calendar-view")[0];
  eventContainer.innerHTML = "";
  for(let i = 0; i < currentCourses.length; i++){
    courseNums.push(currentCourses[i].courseNum);
  }
  console.log(courseNums);
  console.log(courseSections);
  localStorage.setItem('class_list', JSON.stringify(courseNums));
  localStorage.setItem('classSection_list', JSON.stringify(classSection_list));
 
  //Display the widgets
  for(let i = 0; i < currentCourses.length; i++){
    var daysRegistered = grabWeekday(currentCourses[i].courseNum);
    var color = colors[Math.floor(Math.random() * colors.length)];
    for(let d = 0; d < 2; d++){
      renderEvent(currentCourses[i], eventContainer, daysRegistered[d], color);
    }
  }
}

//Renders the event with the appropriate variables
function renderEvent(evt, eventContainer, day, color) {
  //Creates the element
  var oneEvent = document.createElement("div");
  var link = document.createElement("a");
  var linkText = document.createTextNode("Details");
  var eventStatus = document.createElement("div");
  var eventName = document.createElement("div");
  var eventTitle = document.createElement("div");
  var courseTimes = grabTimes(evt.courseNum);     
  eventName.innerHTML = `${evt.courseNum}`;
  eventTitle.innerHTML = `${evt.title}`;


  link.setAttribute('href', "mobile_detail.html");
  link.setAttribute("class", "event-name");
  link.setAttribute("onclick", 'storeCourse("'+evt.courseNum+'")');
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
  oneEvent.style.background = color;
  oneEvent.style.width = evt.width + "%";
  oneEvent.style.left = evt.left + "%";
  oneEvent.style.zIndex = evt.zindex;
  oneEvent.style.height = getHeight(courseTimes[0].startTime, courseTimes[0].endTime) + "px";
  // 100 / ((8-colPos))
    oneEvent.style.gridColumnStart = getColumnPosition(day);
    oneEvent.style.gridRowStart = getRowPosition(courseTimes[0].startTime);

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
  const h = +starttime.split(":")[0];
  const m = +starttime.split(":")[1];
  const totalMinutes = Math.abs(8 - h) * 60 + m;
  const rowPos = totalMinutes /15 + 1;

  return rowPos;
}

//---------------------------------------------------------------------------------

//Storing the course num of the widget clicked on to later find in the detail page
function storeCourse(num){
  localStorage.setItem('course', JSON.stringify(num));
}

//Parse localStorage for the previously saved course to populate detail page
function loadCourse(){
  var course = JSON.parse(localStorage.getItem('course'));
  courseDetails(course);
  populateCalendarView(course);
  fillSections(course)
}

//Fill in the details of the courses and create the HTML elements
function courseDetails(courseNum){
  var classSections = JSON.parse(localStorage.getItem('classSection_list'));
  var courseSection = classSections.find(e => e.courseNum === courseNum);
  var course = currentCourses.find(e => e.courseNum === courseNum);
  var head = course.courseNum + " " + course.title;
  var req = course.fulfilled;
  var prof = course.professor;
  var section = courseSection.section;
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
function populateCalendarView(numSelected){
  var classInfo = [];
  var table = document.querySelector('#schedule');
  var courseNums = JSON.parse(localStorage.getItem("class_list"));
  for(let i = 0; i < courseNums.length; i++){
    classInfo.push(currentCourses.find(e => e.courseNum === courseNums[i]));
  }

  //Formatting the data cells to display the courses
  var elementClassName = ["one", "two", "three"];
  for(let j = 0; j < classInfo.length; j++){
    var tableIndex = sectionConvertToIndices(classInfo[j].courseNum);
    let c1 = tableIndex[0].col;
    let r1 = tableIndex[0].row;
    let c2 = tableIndex[1].col;
    let r2 = tableIndex[1].row;
    let num = classInfo[j].courseNum;
    let className = elementClassName[j];
    table.rows[r1].cells[c1].classList.add(num);
    table.rows[r2].cells[c2].classList.add(num);
    table.rows[r1].cells[c1].setAttribute('class', ''+className+'');
    table.rows[r2].cells[c2].setAttribute('class', ''+className+'');
    if(num === numSelected){
      table.rows[r1].cells[c1].setAttribute('id', 'selected');
      table.rows[r2].cells[c2].setAttribute('id', 'selected');
    }
    table.rows[r1].cells[c1].textContent = num;
    table.rows[r2].cells[c2].textContent = num;
  }
}

//populates the section choices for a course on the detail page
function fillSections(courseNum){
  //Sets the body of the switching sections modal
  var switchBody = document.getElementById("modalBodySwitch");
  var course = allCourses.find(e => e.courseNum === courseNum);
  var sections = course.sections;

  let form = document.createElement('form');
  form.setAttribute("name", "sections");
  for(section of sections){
    // BUILD THE RADIO BUTTON
    let radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', 'sections');
    radio.setAttribute('value', section);
    form.appendChild(radio);
    
    // BUILD THE LABEL
    let label = document.createElement('label');
    label.setAttribute('for', section);
    label.textContent = section;
    form.appendChild(label);
        
    // BUILD THE LINEBREAK
    let linebreak = document.createElement('br');
    form.appendChild(linebreak);
  }

  switchBody.appendChild(form);

  //Fills in the necessary parameters for the switch button
  var switchButton = document.getElementById("switchBTN");
  switchButton.setAttribute("onclick", 'switchSection("'+course.courseNum+'")')

  //Filling in the remove modal
  var removeButton = document.getElementById("removeBTN");
  removeButton.setAttribute("onclick", 'removeSection("'+course.courseNum+'")');
  document.getElementById("removeCourse").innerHTML = "Are you sure you want to remove " + course.courseNum + " " + course.title + "?";
}

//----------------------------------------------------------------------------------------------------------------------------
//converts the section stored in current courses to their appropriate times slots

//returns the index dictionary needed for the calendar table
function sectionConvertToIndices(courseNum){
  var classSections = JSON.parse(localStorage.getItem('classSection_list'));
  var indices = [];
  var r = 0;
  var c1 = 0;
  var c2 = 0;
  var course = classSections.find(e => e.courseNum === courseNum);
  var sectionNum = course.section.substring(0,1);
  var sectionLetter1 = course.section.substring(1,2);
  var sectionLetter2 = course.section.substring(2);
  for(let i = 0; i < sectionNums.length; i++){
    if(sectionNums[i].num === sectionNum){
      r = sectionNums[i].rowIndex;
    }
  }
  for(let j = 0; j < sectionLetters.length; j++){
    if(sectionLetters[j].num === sectionLetter1){
      c1 = sectionLetters[j].colIndex;
    }
  }
  for(let k = 0; k < sectionLetters.length; k++){
    if(sectionLetters[k].num === sectionLetter2){
      c2 = sectionLetters[k].colIndex;
    }
  }
  var index1 = {"row": r, "col": c1};
  var index2 = {"row": r, "col": c2};
  indices.push(index1);
  indices.push(index2);
  return indices;
}

function grabWeekday(courseNum){
  var classSections = JSON.parse(localStorage.getItem('classSection_list'));
  var weekdays = [];
  var course = classSections.find(e => e.courseNum === courseNum);
  var sectionLetter1 = course.section.substring(1,2);
  var sectionLetter2 = course.section.substring(2);
  var firstDay = "";
  var secondDay = "";
  for(let j = 0; j < sectionLetters.length; j++){
    if(sectionLetters[j].num === sectionLetter1){
      firstDay = sectionLetters[j].dayOfWeek;
    }
  }
  for(let k = 0; k < sectionLetters.length; k++){
    if(sectionLetters[k].num === sectionLetter2){
      secondDay = sectionLetters[k].dayOfWeek;
    }
  }
  weekdays.push(firstDay);
  weekdays.push(secondDay);
  return weekdays;
}

function grabTimes(courseNum){
  var classSections = JSON.parse(localStorage.getItem('classSection_list'));
  var course = classSections.find(e => e.courseNum === courseNum);
  var sectionNum = course.section.substring(0,1);
  var times = [];
  var startTime = "";
  var endTime = "";
  for(let i = 0; i < sectionNums.length; i++){
    if(sectionNums[i].num === sectionNum){
      startTime = sectionNums[i].startTime;
      endTime = sectionNums[i].endTime;
    }
  }
  var courseTime = {"startTime": startTime, "endTime": endTime};
  times.push(courseTime);
  console.log(times);
  return times;
}
