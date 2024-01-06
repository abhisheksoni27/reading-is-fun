// Modify the existing generateCalendar function to include day of the week headers
let currentMonth = new Date().getMonth();

document.addEventListener("DOMContentLoaded", function () {
  generateCalendar();
});

function generateCalendar() {
  const calendarContainer = document.getElementById("calendar-container");
  calendarContainer.innerHTML = "";

  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();

  // Display the month name
  const monthNameElement = document.createElement("div");
  monthNameElement.classList.add("month-name");
  monthNameElement.textContent = new Date(
    today.getFullYear(),
    currentMonth,
    1
  ).toLocaleString("default", { month: "long" });
  calendarContainer.appendChild(monthNameElement);

  // Display day of the week headers
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  daysOfWeek.forEach((day) => {
    const dayOfWeekElement = document.createElement("div");
    dayOfWeekElement.classList.add("day-of-week");
    dayOfWeekElement.textContent = day;
    calendarContainer.appendChild(dayOfWeekElement);
  });

  // Determine the starting day of the month
  const firstDayOfMonth = new Date(
    today.getFullYear(),
    currentMonth,
    1
  ).getDay();

  for (let i = 0; i < firstDayOfMonth; i++) {
    // Add placeholder elements for the days before the first day of the month
    const placeholderElement = document.createElement("div");
    placeholderElement.classList.add("day", "placeholder");
    calendarContainer.appendChild(placeholderElement);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(today.getFullYear(), currentMonth, day);
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;

    const storedStatus = getDayStatus(date);
    if (storedStatus === "read") {
      dayElement.classList.add("read");
    } else if (storedStatus === "not-read") {
      dayElement.classList.add("not-read");
    }

    dayElement.addEventListener("click", function () {
      toggleDayStatus(date);
      generateCalendar();
    });

    calendarContainer.appendChild(dayElement);
  }
}

function prevMonth() {
  currentMonth--;
  generateCalendar();
}

function nextMonth() {
  currentMonth++;
  generateCalendar();
}

function getDayStatus(date) {
  const dateString = getDateKey(date);
  return localStorage.getItem(dateString) || "";
}

function toggleDayStatus(date) {
  const dateString = getDateKey(date);
  const currentStatus = getDayStatus(date);

  // Toggle between "read", "not-read", and ""
  const newStatus = currentStatus === "read" ? "not-read" : "read";
  localStorage.setItem(dateString, newStatus);
}

function getDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
