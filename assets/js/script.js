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
var createTaskHandler = function(event) {
    //console.log(event);
    // add prevent default to block browser styling
    event.preventDefault(); 
    //updated with specific .value for input
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //console.dir(taskNameInput);
    //without the below taskTypeInput variable albeit everything else- the form does not function 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name and add div to html via JS
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    //updated to work with var taskNameInput then taskInfoEl
    listItemEl.appendChild(taskInfoEl);
    //adds entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //console.dir(listItemEl);
};

// replace this buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", createTaskHandler);
