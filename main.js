const calendarTable = document.getElementById("calendar-table");
let baseDate = new Date();

function getWeekDates(base) {
  const sunday = new Date(base);
  sunday.setDate(base.getDate() - base.getDay()); // Sunday of the week

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function renderCalendar() {
  calendarTable.innerHTML = "";

  const weekDates = getWeekDates(baseDate);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const times = [...Array(9)].map((_, i) => `${10 + i}:00`);

  // Header row
  const headerRow = document.createElement("tr");
  weekDates.forEach(date => {
    const th = document.createElement("th");
    const day = date.getDay();
    th.className = day === 0 ? "sunday" : day === 6 ? "saturday" : "";
    th.textContent = `${date.getMonth() + 1}/${date.getDate}（${weekdays[day]}）`;
    headerRow.appendChild(th);
  });
  calendarTable.appendChild(headerRow);

  // Time rows
  times.forEach(time => {
    const row = document.createElement("tr");
    weekDates.forEach(() => {
      const td = document.createElement("td");
      td.textContent = Math.random() < 0.7 ? "◎" : "×"; // ダミー予約状況
      row.appendChild(td);
    });
    calendarTable.appendChild(row);
  });
}

function changeWeek(offset) {
  baseDate.setDate(baseDate.getDate() + offset * 7);
  renderCalendar();
}

// 初期表示
renderCalendar();