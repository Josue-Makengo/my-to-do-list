class TodoList {
    constructor() {
        this.inputBox = document.getElementById("input-box");
        this.listContainer = document.getElementById("list-container");
        this.STORAGE_KEY = "todo-list-data";
        
        // Lier les méthodes au contexte de la classe
        this.handleClick = this.handleClick.bind(this);
        this.addTask = this.addTask.bind(this);
        
        // Initialiser les écouteurs d'événements
        this.initializeEventListeners();
        
        // Charger les tâches sauvegardées
        this.showTasks();
    }

    initializeEventListeners() {
        this.listContainer.addEventListener("click", this.handleClick, false);
        
        // Ajouter un écouteur pour la touche "Entrée"
        this.inputBox.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.addTask();
            }
        });
    }

    handleClick(e) {
        const target = e.target;
        
        if (target.tagName === "LI") {
            this.toggleTask(target);
        } else if (target.tagName === "SPAN") {
            this.deleteTask(target.parentElement);
        }
    }

    createTaskElement(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;
        
        const deleteButton = document.createElement("span");
        deleteButton.textContent = "\u00d7";
        deleteButton.className = "delete-button";
        
        li.appendChild(deleteButton);
        return li;
    }

    addTask() {
        const taskText = this.inputBox.value.trim();
        
        if (!taskText) {
            alert("Veuillez écrire quelque chose !");
            return;
        }

        try {
            const taskElement = this.createTaskElement(taskText);
            this.listContainer.appendChild(taskElement);
            this.inputBox.value = "";
            this.saveData();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche :", error);
        }
    }

    toggleTask(taskElement) {
        try {
            taskElement.classList.toggle("checked");
            this.saveData();
        } catch (error) {
            console.error("Erreur lors du basculement de la tâche :", error);
        }
    }

    deleteTask(taskElement) {
        try {
            taskElement.remove();
            this.saveData();
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche :", error);
        }
    }

    saveData() {
        try {
            localStorage.setItem(this.STORAGE_KEY, this.listContainer.innerHTML);
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des données :", error);
        }
    }

    showTasks() {
        try {
            const savedTasks = localStorage.getItem(this.STORAGE_KEY);
            if (savedTasks) {
                this.listContainer.innerHTML = savedTasks;
            }
        } catch (error) {
            console.error("Erreur lors du chargement des tâches :", error);
        }
    }
}

// Initialiser l'application
const todoList = new TodoList();






