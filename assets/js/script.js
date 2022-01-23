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


//Add to generate unique ids for every input
var taskIdCounter = 0;

//Add dynamic content to the main parent for events
var pageContentEl = document.querySelector("#page-content");

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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name and add div to html via JS
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    //updated to work with var taskNameInput then taskInfoEl
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //adds entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    //console.dir(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions"; 
    
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);  

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

return actionContainerEl;
}
// replace this buttonEl.addEventListener("click", taskFormHandler);
formEl.addEventListener("submit", taskFormHandler);
//Adding new info to reset feature

//identify the function before using it with an event
var taskButtonHandler = function(event) {
    //console.log(event.target);

    //add target to delete button
    if (event.target.matches(".delete-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        //console.log("you clicked a delete button!");
        //console.log(taskId);
        deleteTask(taskId);
    }
};

//New function with taskId as an argument/parameter
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //console.log(taskId);
    taskSelected.remove();
};

//add main element eventlisteners for dynamic child behavior
pageContentEl.addEventListener("click", taskButtonHandler);

