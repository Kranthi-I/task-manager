const currentUserEmail = localStorage.getItem("currentUser");
if (!currentUserEmail) location.href = "login.html";

const taskNameInput = document.getElementById("taskName");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const taskList = document.getElementById("taskList");

function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.frequency.value = 1000;
  osc.connect(ctx.destination);
  osc.start();
  setTimeout(() => osc.stop(), 300);
}

function getUser() {
  return JSON.parse(localStorage.getItem("users"))
    .find(u => u.email === currentUserEmail);
}

function saveUser(user) {
  let users = JSON.parse(localStorage.getItem("users"));
  users = users.map(u => u.email === currentUserEmail ? user : u);
  localStorage.setItem("users", JSON.stringify(users));
}

function isBlocked(start, end, tasks, ignore = null) {
  return tasks.some((t, i) =>
    i !== ignore && start < t.endTime && end > t.startTime
  );
}

function addTask() {
  const taskName = taskNameInput.value.trim();
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;

  if (!taskName || !startTime || !endTime) {
    alert("Fill all fields");
    return;
  }

  if (startTime >= endTime) {
    alert("End time must be after start time");
    return;
  }

  const user = getUser();

  if (isBlocked(startTime, endTime, user.tasks)) {
    alert("⛔ This time slot is already blocked");
    return;
  }

  user.tasks.push({
    taskName,
    startTime,
    endTime,
    completed: false,
    startedAlerted: false,
    endedAlerted: false
  });

  saveUser(user);
  renderTasks();

  taskNameInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";

  alert("✅ Task added successfully");
}

function renderTasks() {
  const user = getUser();
  taskList.innerHTML = "";

  user.tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <strong>${task.taskName}</strong><br>
      ⏳ ${task.startTime} - ${task.endTime}<br>
      <div class="task-actions">
        <label>
          <input type="checkbox" ${task.completed ? "checked" : ""}>
          Done
        </label>
        <button class="edit">Edit</button>
      </div>
    `;

    card.querySelector("input").onchange = () => {
      task.completed = true;
      saveUser(user);
      alert("🎉 Great job! Keep going!");
    };

    card.querySelector(".edit").onclick = () => {
      const ns = prompt("New start time", task.startTime);
      const ne = prompt("New end time", task.endTime);

      if (!ns || !ne || ns >= ne) return alert("Invalid time");

      if (isBlocked(ns, ne, user.tasks, index)) {
        alert("⛔ Time slot blocked");
        return;
      }

      task.startTime = ns;
      task.endTime = ne;
      task.startedAlerted = false;
      task.endedAlerted = false;

      saveUser(user);
      renderTasks();
    };

    taskList.appendChild(card);
  });
}

setInterval(() => {
  const now = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const user = getUser();

  user.tasks.forEach(task => {
    if (now === task.startTime && !task.startedAlerted) {
      playBeep();
      alert(`🚀 Start: ${task.taskName}`);
      task.startedAlerted = true;
    }

    if (now === task.endTime && !task.endedAlerted) {
      playBeep();
      if (!task.completed) {
        alert(`⚠️ Time up: ${task.taskName}`);
      }
      task.endedAlerted = true;
    }
  });

  saveUser(user);
}, 60000);

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "login.html";
}

renderTasks();
