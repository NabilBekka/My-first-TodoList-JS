export async function lectureFetch(){
    try {
        const todos = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        if (!todos.ok){
            throw new Error("Impossible de lire la liste des taches")
        }
        return  await todos.json()
    }
    catch(er){
        console.error(er)
        const p= document.createElement('p')
        p.classList="alert alert-danger"
        p.role="alert"
        p.innerText ="Erreur de chargement!"
        document.querySelector('main').append(p)
    }
}