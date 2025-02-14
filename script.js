document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      if (task.completed) {
        li.classList.add('completed');
      }

      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleCompleted(${index})" class="btn btn-success btn-sm">${task.completed ? 'Undo' : 'Complete'}</button>
          <button onclick="editTask(${index})" class="btn btn-warning btn-sm">Edit</button>
          <button onclick="deleteTask(${index})" class="btn btn-danger btn-sm">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  // Add new task
  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      tasks.push({ text: taskText, completed: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
      renderTasks();
    }
  });

  // Toggle task completion
  window.toggleCompleted = function (index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  };

  // Edit task
  window.editTask = function (index) {
    const newText = prompt('Edit your task:', tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
      tasks[index].text = newText.trim();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  };

  // Delete task
  window.deleteTask = function (index) {
    if (confirm('Are you sure you want to delete this task?')) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  };

  // Initial render
  renderTasks();
});
