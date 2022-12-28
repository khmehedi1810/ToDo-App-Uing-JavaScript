let frm = document.querySelector(".tofofrm")
var data = document.querySelector("#todoInp")
let con = document.querySelector('.tbdy')

window.addEventListener("DOMContentLoaded", () => {
    let todos = findTodo()
    todos.map((todo) => addTodoList(todo.ids, todo.finalData))
    
})

frm.addEventListener("submit", (e)=> {
    e.preventDefault()
    let ids = Date.now().toString()
    let finalData = data.value
    addTodoList(ids, finalData)
    

    let todos = findTodo()
    todos.push({ids, finalData})
    localStorage.setItem("mytodos", JSON.stringify(todos))

    data.value = ''
})

findTodo = () => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : []
}

addTodoList = (ids, data) => {
    let tr = document.createElement('tr')
    tr.id = ids
    tr.innerHTML = `
        <td>${data}</td>
        <td><butoon class="delTodo btn btn-danger">Del</button></td>
    `
    con.appendChild(tr)
    let deltodo = tr.querySelector('.delTodo')
    deltodo.addEventListener("click", deltodosHere)
}

deltodosHere = (e) => {
    let deltr = e.target.parentElement.parentElement
    let todosId = deltr.id
    con.removeChild(deltr)
    let todos = findTodo()
    todos  = todos.filter((todo) => todo.ids != todosId)
    localStorage.setItem("mytodos", JSON.stringify(todos))
    
}