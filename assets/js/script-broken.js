//Add to generate unique ids for every input
var taskIdCounter = 0;

//Add dynamic content to the main parent for events
var formEl = document.querySelector("#task-form");
var tasks = [];
var tasksToDoEl = document.querySelector("#tasks-to-do");
//Add a way to recognize the other columns
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

// add event as an argument to the function
var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // check if input values are empty strings
    if (!taskNameInput === "" || !taskTypeInput === "") {
        alert("You need to fill out the task form!");
        return false;
    }
    
    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    //Add to recognize existing when editing
    var isEdit = formEl.hasAttribute("data-task-id");
    //console.log(isEdit);
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
        // package up data as an object
        // no data attribute, so create object as normal and pass to createTaskEl function
        else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            //Add status to transfer object to an array for localStorage string
            status: "to do"
        };
        // send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
};

    //Reset the form to auto remove the prior input
    formEl.reset();

//Refactor function to replace createTaskHandler with taskFormHandler
var createTaskEl = function(taskDataObj) {
    //add console.log to check data prior to array for localStorage
    //console.log(taskDataObj);
    //console.log(taskDataObj.status);
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

    //add id to object and to data array for localStorage persistency
    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

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
};

// testing the edit functionality
var completeEditTask = function(taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
  
    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

//identify the function before using it with an event
var taskButtonHandler = function(event) {
    //console.log(event.target);
    //now that we are adding more buttons-group them here
    var targetEl = event.target;

    //put edit button before delete button
    if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //revise delete button from event.target.matches for one button to targetEl for several
    else if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        //console.log("you clicked a delete button!");
        //console.log(taskId);
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event) {
    console.log(event.target.value);
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
    }
    
    console.log(tasks);
};

var editTask =function(taskId) {
    //console.log(taskId);

    // The below code adds details to gets a task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //console.log(taskType);
    //add below to make the function work
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    //additional user interation
    document.querySelector("#save-task").textContent = "Save Task";
    // add identifier
    formEl.setAttribute("data-task-id", taskId);
};

//New function with taskId as an argument/parameter
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //console.log(taskId);
    taskSelected.remove();
};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);