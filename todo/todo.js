let input = document.getElementById("enter");
let taskbar = document.getElementById("tasks");
let counter = document.getElementById("count");
let taskarray = localStorage.getItem("tasks");
let popupbutton = document.getElementById("TaskDone");
let tasksDone = [];
localStorage.setItem("tasksdone",JSON.stringify(tasksDone)); // 
tasksDone = localStorage.getItem("tasksdone");
tasksDone = JSON.parse(tasksDone);
if (!tasksDone) {
    tasksDone = [];
}

// 5 recently completed tasks ->
popupbutton.addEventListener("click", function () {
    let popupwindow = document.createElement("div");
    popupwindow.id = "popup";
    let cut2 = document.createElement("button");
    cut2.className = "cut2";
    cut2.innerText = "X";
    cut2.addEventListener("click", function () {
        cut2.parentElement.remove();
    });

    let head = document.createElement("h1");
    head.innerText = "Recent 5 Tasks Completed";
    head.style.textAlign = "center";
    head.style.height = "15%";
    head.style.color = " aliceblue"
    popupwindow.appendChild(head);
    let div = document.createElement("div");
    div.id = "tasksDoneDiv";
    for (let key = 0; key < 5; key++) {
       
        let taskpara = document.createElement("p");
        taskpara.id = "taskdoneid"
        if(tasksDone[key]){
        taskpara.innerText = "-->  " + tasksDone[key];
        }
        div.appendChild(taskpara);
        
    }
    popupwindow.appendChild(div);
    popupwindow.appendChild(cut2);
    document.body.appendChild(popupwindow);
});

taskarray = JSON.parse(taskarray);
if (taskarray) {
    for (let key of taskarray) {
        addTask(key);
    }
    countUpdater();
} else {
    taskarray = [];
}
function countUpdater() {
    counter.innerText = taskarray.length;
}

// WHEN ENTER IS PRESSED

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        input.value = input.value.trim();
        taskarray.push(input.value);
        let jd = JSON.stringify(taskarray);
        localStorage.setItem("tasks", jd);
        addTask(input.value);
        input.value = "";
        countUpdater();
    }
});

// TO ADD A TASK
function addTask(taskstr) {
    let intask = document.createElement("div");
    let task = document.createElement("div");
    task.classList.add("taskindividual");

    let pp = document.createElement("p");
    pp.innerText = taskstr;
    task.appendChild(pp);

    // CREATING BUTTONS
    let buttons = document.createElement("div");
    buttons.id = "buttons";
    buttons.style.width = "20%";
    buttons.style.height = "100%";

    let check = document.createElement("button");
    check.innerText = "Done";
    check.style.backgroundColor = "green"
    check.style.color = " aliceblue"
    check.addEventListener("click", function () {
        let tp = cut.parentElement.previousSibling;
        tasksDone.unshift(tp.innerText);
        let jsonpush = JSON.stringify(tasksDone);
        localStorage.setItem("tasksdone", jsonpush);
        taskarray = taskarray.filter(function (value) {
            return value != tp.innerText;
        });
        let jd = JSON.stringify(taskarray);
        localStorage.setItem("tasks", jd);
        cut.parentElement.parentElement.parentElement.remove();
        countUpdater();
    });

    let cut = document.createElement("button");
    cut.className = "cut";
    cut.innerText = "X";

    // FOR REMOVING THE TASK
    cut.addEventListener("click", function () {
        let tp = cut.parentElement.previousSibling;
        taskarray = taskarray.filter(function (value) {
            return value != tp.innerText;
        });
        let jd = JSON.stringify(taskarray);
        localStorage.setItem("tasks", jd);
        cut.parentElement.parentElement.parentElement.remove();
        countUpdater();
    });

    // APPENDING
    buttons.append(check, cut);
    task.appendChild(buttons);
    intask.append(task);
    let line = document.createElement("hr");
    intask.appendChild(line);
    taskbar.appendChild(intask);

   
}
