let currentSunday = getSunday(new Date());

function getSunday(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay()); // Sunday start
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDateWithDay(date) {
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  return `${date.getMonth() + 1}/${date.getDate()}（${dayNames[date.getDay()]}）`;
}

function generateCalendar(baseDate) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const timeHeader = document.createElement("div");
  timeHeader.className = "cell header";
  timeHeader.textContent = "時間";
  calendar.appendChild(timeHeader);

  for (let i = 0; i < 7; i++) {
    const day = new Date(baseDate);
    day.setDate(day.getDate() + i);

    const cell = document.createElement("div");
    cell.className = "cell header";

    if (day.getDay() === 0) cell.classList.add("sunday");
    if (day.getDay() === 6) cell.classList.add("saturday");

    cell.textContent = formatDateWithDay(day);
    calendar.appendChild(cell);
  }

  for (let hour = 10; hour <= 18; hour++) {
    const timeCell = document.createElement("div");
    timeCell.className = "cell header";
    timeCell.textContent = `${hour}:00`;
    calendar.appendChild(timeCell);

    for (let i = 0; i < 7; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      const day = new Date(baseDate);
      day.setDate(day.getDate() + i);

      if (day.getDay() === 0) cell.classList.add("sunday");
      if (day.getDay() === 6) cell.classList.add("saturday");

      cell.textContent = "◎"; // 状態（◎＝空き、×＝予約済み）など変更可能
      calendar.appendChild(cell);
    }
  }

  // 週ラベル更新
  const endDate = new Date(baseDate);
  endDate.setDate(baseDate.getDate() + 6);
  document.getElementById("weekLabel").textContent =
    `${formatDateWithDay(baseDate)} ～ ${formatDateWithDay(endDate)}`;
}

// 週移動ボタン
document.getElementById("prevWeek").onclick = () => {
  currentSunday.setDate(currentSunday.getDate() - 7);
  generateCalendar(currentSunday);
};

document.getElementById("nextWeek").onclick = () => {
  currentSunday.setDate(currentSunday.getDate() + 7);
  generateCalendar(currentSunday);
};

generateCalendar(currentSunday);