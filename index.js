let inputTask = document.getElementById('input-task');
let addTask = document.getElementById('add-task');
let listItems = document.getElementById('list_items');
let counter = document.getElementById('counter');
let allButton = document.getElementById("all");
let activeButton = document.getElementById("active");
let completedButton = document.getElementById("completed");
let clearCompletedButton = document.getElementById("clear-completed");
let moonIcon = document.getElementById('moon');
let sunIcon = document.getElementById('sun');
let container = document.querySelector('.container');

// A function to store data on local storage
function saveData(){
    localStorage.setItem('data', listItems.innerHTML); 
}

// A function to show data saved on local storage
function showData(){
    listItems.innerHTML = localStorage.getItem('data');
    updateCounter();
}

showData();

//A function to add task to the list items when the add task button is clicked
addTask.addEventListener('click', ()=>{
    let newTask = inputTask.value.trim();
    if(newTask === ""){
        alert('A task cannot be empty');
    }else{
        let Li = document.createElement('li');
        Li.innerHTML = newTask;
        let deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = ('x');
        Li.appendChild(deleteBtn);
        listItems.appendChild(Li);
        inputTask.value = "";
        updateCounter();
        saveData();
    }
})


// A function to check and delete a task from the list items
listItems.addEventListener('click', (e)=>{
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        saveData();
    }else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        updateCounter();
        saveData();
    }
})

// A function to update the task counter
function updateCounter() {
    const listCount = listItems.children.length;
    counter.innerHTML = listCount;
}


// A function to toggle mode and save to localStorage
function toggleMode() {
    container.classList.toggle("darkmode");
        
    // Switch icons
    // moonIcon.classList.toggle("active");
    // sunIcon.classList.toggle("active");

    // Update localStorage based on the new mode
    if (container.classList.contains("darkmode")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "day");
    }
}

// A function to check localStorage for the current mode
const savedMode = localStorage.getItem("mode");
if (savedMode === "dark") {
    container.classList.add("darkmode");
    moonIcon.classList.remove("active");
    sunIcon.classList.add("active");
} else {
    container.classList.remove("darkmode");
    sunIcon.classList.remove("active");
    moonIcon.classList.add("active");
}

// Event listener for changing the mode
moonIcon.addEventListener("click", toggleMode);
sunIcon.addEventListener("click", toggleMode);


document.addEventListener("DOMContentLoaded", () => {
    
    const listItems = document.getElementById("list_items").getElementsByTagName("li");

    // Event listeners for the filter buttons
    allButton.addEventListener("click", () => filterTasks("all"));
    activeButton.addEventListener("click", () => filterTasks("active"));
    completedButton.addEventListener("click", () => filterTasks("completed"));

    // Function to filter tasks based on the selected state
    function filterTasks(state) {
        // Update active class on buttons
        allButton.classList.remove("active");
        activeButton.classList.remove("active");
        completedButton.classList.remove("active");

        if (state === "all") {
            allButton.classList.add("active");
            for (let item of listItems) {
                item.style.display = "flex"; // Show all tasks
            } 
        } else if (state === "active") {
            activeButton.classList.add("active");
            for (let item of listItems) {
                if (item.classList.contains("checked")) {
                    item.style.display = "none"; // Hide completed tasks
                } else {
                    item.style.display = "flex"; // Show active tasks
                }
            }  
        } else if (state === "completed") {
            completedButton.classList.add("active");
            for (let item of listItems) {
                if (item.classList.contains("checked")) {
                    item.style.display = "flex"; // Show completed tasks
                } else {
                    item.style.display = "none"; // Hide active tasks
                }
            }
        } 
    }

     // Add event listener to clear completed tasks when clicked
     clearCompletedButton.addEventListener("click", () => {
        // Loop through all list items and remove checked items
        for (let i = listItems.length - 1; i >= 0; i--) {  // Iterate backward to avoid index issues
            if (listItems[i].classList.contains("checked")) {
                listItems[i].remove();
            }
        }
        updateCounter();  // Update the counter after removing items
        saveData();
    });
    
});




