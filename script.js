import { lectureFetch } from "./scipts/api.js";
import { createTodo } from "./scipts/functions.js";

let idTodo = 0
const listTodos = await lectureFetch()
let list_a_faire=listTodos.filter(e=>e.completed===false)
let list_faites=listTodos.filter(e=>e.completed===true)

for (let todo of listTodos){
    idTodo++
}
console.log(listTodos)

afficherTodos(listTodos)
tachesFaites(listTodos)
toutesLesTaches(listTodos)
tachesAFaire(listTodos)
ajoutTodo()

/**
 * Affichage des todos
 * @param {Array} todos 
 */
function afficherTodos(todos){
    const ul= document.querySelector('.list-group')
    ul.innerHTML=""
    for(let i=0;i<todos.length;i++){
        createTodo(ul,i+1,todos[i].title,todos[i].completed,todos[i].id)
    }
    boutonCheck()
    removeTodo()
}

/**
 * Suppression d'un todo
 */
function removeTodo(){
    const btnSup= document.querySelectorAll('.btn-sm')
    btnSup.forEach(el=>{
        el.addEventListener('click',e=>{
            const id= e.currentTarget.id[3]
            for (let i = 0; i<listTodos.length;i++){
                if (id == listTodos[i].id){
                    listTodos.splice(i,1)
                }
            }
            list_a_faire=listTodos.filter(e=>e.completed===false)
            list_faites=listTodos.filter(e=>e.completed===true)
            contolAffichage()

        })
    })
}

/**
 * L'ajout d'un todo à la list des todos
 */
function ajoutTodo(){
    const formulaire= document.querySelector('form')
    formulaire.addEventListener('submit',e=>{
        e.preventDefault()
        idTodo++
        const valeur= e.currentTarget.querySelector('.form-control').value
        const newTodo={
            userId: 1,
            id:idTodo,
            title: valeur,
            completed: false
        }
        listTodos.push(newTodo)
        e.currentTarget.reset() // Vider le champs du formulaire
        list_a_faire=listTodos.filter(e=>e.completed===false)
        list_faites=listTodos.filter(e=>e.completed===true)
        
        contolAffichage()
    })
}

function boutonCheck(){
    const btn = document.querySelectorAll('.form-check-input')
    btn.forEach(e=>{
        e.addEventListener('change',()=>{
            // const i= e.parentElement.id[2]-1
            // listTodos[i].completed=!listTodos[i].completed
            const id = e.parentElement.id[2]
            for (let list of listTodos){
                if (id == list.id){
                    list.completed=!list.completed
                }
            }
            console.log(listTodos)
            list_a_faire=listTodos.filter(e=>e.completed===false)
            list_faites=listTodos.filter(e=>e.completed===true)
            // console.log(listTodos,list_a_faire,list_faites)
            contolAffichage()
        })
    })
}

/**
 * Affichage des taches a_faire
 */
function toutesLesTaches(){
    const toutes = document.querySelector('#toutes')
    const a_faire = document.querySelector('#a_faire')
    const faites = document.querySelector('#faites')
    toutes.addEventListener('click',()=>{
        toutes.classList="btn btn-outline-primary active"
        a_faire.classList="btn btn-outline-primary"
        faites.classList="btn btn-outline-primary"
        afficherTodos(listTodos)
    })
}

/**
 * Affichage des taches a_faire
 */
function tachesAFaire(){
    const toutes = document.querySelector('#toutes')
    const a_faire = document.querySelector('#a_faire')
    const faites = document.querySelector('#faites')
    a_faire.addEventListener('click',()=>{
        toutes.classList="btn btn-outline-primary"
        a_faire.classList="btn btn-outline-primary active"
        faites.classList="btn btn-outline-primary"
        afficherTodos(list_a_faire)
    })
}

/**
 * Affichage des taches faites
 */
function tachesFaites(){
    const toutes = document.querySelector('#toutes')
    const a_faire = document.querySelector('#a_faire')
    const faites = document.querySelector('#faites')
    faites.addEventListener('click',()=>{
        toutes.classList="btn btn-outline-primary"
        a_faire.classList="btn btn-outline-primary"
        faites.classList="btn btn-outline-primary active"
        afficherTodos(list_faites)
    })
}

function contolAffichage(){
    const a_faire = document.querySelector('#a_faire')
        const faites = document.querySelector('#faites')

        if(a_faire.classList[2]==="active"){
            afficherTodos(list_a_faire)
        }else if(faites.classList[2]==="active"){
            afficherTodos(list_faites)
        }else{
            afficherTodos(listTodos)
            console.log(a_faire.classList[2])
            console.log(faites.classList[2])
        }
}