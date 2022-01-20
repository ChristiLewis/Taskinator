//var buttonEl = document.querySelector("#save-task");
//console.log(buttonEl);
//var tasksToDoEl = document.querySelector("#tasks-to-do");
//buttonEl.addEventListener("click", function() {
    //alert("button clicked");
    //});
//document.createElement("li");
//var taskItemEl = document.createElement("li");
//taskItemEl.textContent = "hello"; 
//var tasksToDoEl = document.querySelector("#tasks-to-do");
//tasksToDoEl.appendChild(taskItemEl);
//taskItemEl.className = "task-item";

var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

// add event as an argument to the function
var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    // package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
  //Reset the form to auto remove the prior input
  formEl.reset();
};
//Refactor function to replace createTaskHandler with taskFormHandler
var createTaskEl = function(taskDataObj) {
  
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name and add div to html via JS
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    //updated to work with var taskNameInput then taskInfoEl
    listItemEl.appendChild(taskInfoEl);

    //adds entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    //console.dir(listItemEl);
};
// replace this buttonEl.addEventListener("click", taskFormHandler);
formEl.addEventListener("submit", taskFormHandler);
