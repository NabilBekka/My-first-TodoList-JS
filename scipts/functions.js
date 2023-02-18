/**
 * 
 * @param {HTMLElement} todos 
 * @param {number} id 
 * @param {string} contenu 
 * @param {boolean} check
 * @param {number} todoId
 */
export function createTodo(todos,id,contenu,check,todoId){
    //Creattion du li
    const li = document.createElement('li')
    li.classList="todo list-group-item d-flex align-items-center"
    li.id=`li${todoId}`
    //Creation des enfants du li
    const input= document.createElement('input')
    input.classList="form-check-input"
    input.type="checkbox"
    input.id=`todo-${id}`
    input.checked=check

    const label1=document.createElement('label')
    label1.classList="ms-2 form-check-label"
    label1.setAttribute('for',`todo-${id}`)
    label1.innerText=contenu

    const label2=document.createElement('label')
    label2.classList="ms-auto btn btn-danger btn-sm"
    //label2.id=`btn${id}`
    label2.id=`btn${todoId}`

    const i=document.createElement('i')
    i.classList="bi-trash"
    label2.append(i)

    li.append(input,label1,label2)

    //On attache le li à l'element parent
    todos.prepend(li)
}
