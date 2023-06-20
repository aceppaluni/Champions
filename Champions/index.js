
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-2cf6d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const endorsementsInDB = ref(dataBase, "endorsements")

const inputField = document.getElementById("input-El")
const endorsementArea = document.getElementById("endorsementArea")
const endorsementBoxes = document.getElementById("endorsement-boxes")
const publishBtn = document.getElementById("btn")

publishBtn.addEventListener("click", function(){
    let inputValue = inputField.value
    
    push(endorsementsInDB, inputValue)
    
    //endorsementBoxes.innerHTML = ""
    
    clearinputField()
    
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
        
        clearBoxes()
        
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentEndorsement = endorsementsArray[i]
            let currentEndorsementID = currentEndorsement[0]
            let currentEndorsementValue = currentEndorsement[1]
            
            appendToBoxes(currentEndorsement)
        }
    } else {
        endorsementBoxes.innerHTML = "No comments to display"
    }
    
})

function appendToBoxes(endorsement) {
    let endorsementId = endorsement[0]
    let endorsementValue = endorsement[1]
    
    let newEl = document.createElement("li")
    
    newEl.innerHTML = endorsementValue
    
    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(dataBase, `endorsements/${endorsementID}`)
        
        remove(exactLocationOfItemInDB)
    })
    endorsementBoxes.append(newEl)
}

function clearBoxes() {
    endorsementBoxes.innerHTML = " "
}
function clearinputField() {
    inputField.value = ""
}

