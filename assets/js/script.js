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

var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  };

  buttonEl.addEventListener("click", createTaskHandler);