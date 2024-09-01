document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Cargar las tareas guardadas en localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            for (let task of tasks) {
                addTask(task.text, task.completed);
            }
        }
    }
    
    loadTasks();    

    // Manejar el envío del formulario para agregar nuevas tareas
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Por favor, completa todos los campos antes de agregar una tarea.");
            return;
        }

        if (isDuplicateTask(taskText)) {
            alert("Esta tarea ya está en la lista.");
            return;
        }

        addTask(taskText);
        taskInput.value = "";
    });

    // Función para agregar una nueva tarea a la lista
    function addTask(taskText, completed = false) {
        const li = document.createElement("li");
        li.textContent = taskText;

        if (completed) {
            li.classList.add("completed");
        }

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", function() {
            const currentTaskText = li.firstChild.textContent;
            const newTaskText = prompt("Edita tu tarea:", currentTaskText);

            if (newTaskText && newTaskText.trim() !== "" && !isDuplicateTask(newTaskText)) {
                li.firstChild.textContent = newTaskText;
                saveTasks();
            } else if (isDuplicateTask(newTaskText)) {
                alert("Esta tarea ya está en la lista.");
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        li.addEventListener("click", function() {
            li.classList.toggle("completed");
            saveTasks();
        });

        taskList.appendChild(li);
        saveTasks();
    }

    // Función para verificar si una tarea ya existe en la lista
    function isDuplicateTask(taskText) {
        const tasks = taskList.getElementsByTagName("li");
        for (let task of tasks) {
            if (task.firstChild.textContent === taskText) {
                return true;
            }
        }
        return false;
    }

    // Función para guardar las tareas en localStorage
    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.getElementsByTagName("li");
        
        for (let task of taskItems) {
            tasks.push({
                text: task.firstChild.textContent,
                completed: task.classList.contains("completed")
            });
        }
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }    
});
