interface Todo {
  id: number,
  title: string,
  completed: boolean,
  createdAt: Date
}

// Step 2: Initialize the todos array
let todos: Todo[] = []

// Step 3: Get reference to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const clearCompletedButton = document.getElementById('clear-completed-btn') as HTMLButtonElement
const toggleAllButton = document.getElementById('toggle-all-btn') as HTMLButtonElement

// Step 4: Create a function to add a new todo
const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false,
    createdAt: new Date()
  }
  todos.push(newTodo)
  renderTodos()
}
// Function to toggle a single todo's completed status
const toggleTodo = (id: number): void => {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
  renderTodos()
}

const renderTodos = (): void => {
  todoList.innerHTML = ''

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    if (todo.completed) {
      li.classList.add('completed')
    }

    const formattedDate = todo.createdAt.toLocaleString()

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} />
      <span class="spancolor">${todo.title}</span> 
      <small>Created at: ${formattedDate}</small>
      <button class="toggle-btn">Completed</button>
      <button class="remove-btn">Remove</button>
      <button id="editBtn">Edit</button>
    `
    
    addRemoveButtonListener(li, todo.id)
    addToggleListener(li, todo.id)
    addEditButtonListener(li, todo.id)
    todoList.appendChild(li)
  })
}

renderTodos()

todoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = todoInput.value.trim()
  if (text !== '') {
    addTodo(text)
    todoInput.value = ''
  }
})

// Function to toggle all todos' completed status
const toggleAllTodos = (): void => {
  const allCompleted = todos.every(todo => todo.completed) // Check if all are completed

  todos = todos.map(todo => ({
    ...todo,
    completed: !allCompleted // Toggle all to the opposite state
  }))

  renderTodos() // Re-render the todo list
}

const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('.remove-btn')
  removeButton?.addEventListener('click', () => removeTodo(id))
}


const addEditButtonListener = (li: HTMLLIElement, id: number) => {
  const editButton = li.querySelector('#editBtn')
  editButton?.addEventListener('click', () => editTodo(id))
}

const editTodo = (id:number) => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    const text = prompt('Edit todo', todo.title)
    if (text) {
      todo.title = text
      renderTodos()
    }
    }
  }

const addToggleListener = (li: HTMLLIElement, id: number) => {
  const checkbox = li.querySelector('input[type="checkbox"]') as HTMLInputElement
  checkbox?.addEventListener('change', () => toggleTodo(id))

  const toggleButton = li.querySelector('.toggle-btn')
  toggleButton?.addEventListener('click', () => toggleTodo(id))
}
toggleAllButton.addEventListener('click', toggleAllTodos)

const removeTodo = (id: number) => {
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}

const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed)
  renderTodos()
}

clearCompletedButton.addEventListener('click', clearCompletedTodos)



const handleColorChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (target && body) {
    body.style.backgroundColor = target.value;
  }
}
const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
const body = document.getElementById('body') as HTMLBodyElement;
colorPicker.addEventListener('input', handleColorChange);



  
