// récupère l'élement de la boîte de saisie et du contenur de saisie
const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

// function pour ajouter une tâche
// if verifie si la boîte de saisie est vide et crée un nouvel élément de liste et l'ajoute à la liste 
function addTask(){
    if(inputBox.value === ''){
        alert("Youmust write something !")
    }
    else{
        let li = document.createElement("li")
        li.innerHTML = inputBox.value
        listContainer.appendChild(li)
    // crée un élément de suppression et l'ajoute l'élément de liste
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    inputBox.value = ""
    // sauvegarde les données
    saveData()
}

// ajoute un écouteur d'événements sur le conteneur de la liste
listContainer.addEventListener("click", function(e){
    // bascule la classe checked si l'élément cliqué est une tâche
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
        saveData()
    }

    // supprime l'élément parent si l'élément cliqué est un bouton de suppression
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove()
        saveData()
    }
}, false)

// fonction pour sauvegarder les données dans le stockage local
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
    console.log(localStorage)
}

// fonction pour afficher les tâches sauvegardées depuis le stockage local
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data")
}

// appelle de la fonction pour afficher les tâches au chargement de la page
showTask()


// function openPopup() {
//     document.getElementById("popup").style.display = "block"
// }

// function closePopup() {
//     document.getElementById("popup").style.display = "none"
// }

