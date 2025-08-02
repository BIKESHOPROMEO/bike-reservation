let currentSunday = getSunday(new Date());

function getSunday(date) {
  const sunday = new Date(date);
  sunday.setDate(sunday.getDate() - sunday.getDay());
  sunday.setHours(0, 0, 0, 0);
  return sunday;
}

function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function generateCalendar(baseDate) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const headerRow = document.createElement("div");
  headerRow.className = "row";

  const timeHeader = document.createElement("div");
  timeHeader.className = "cell header";
  timeHeader.textContent = "時間";
  calendar.appendChild(timeHeader);

  for (let i = 0; i < 7; i++) {
    const day = new Date(baseDate);
    day.setDate(day.getDate() + i);
    const cell = document.createElement("div");
    cell.className = "cell header";
    cell.textContent = formatDate(day);
    calendar.appendChild(cell);
  }

  for (let hour = 9; hour <= 17; hour++) {
    const timeCell = document.createElement("div");
    timeCell.className = "cell header";
    timeCell.textContent = `${hour}:00`;
    calendar.appendChild(timeCell);

    for (let i = 0; i < 7; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = "○"; // 空き or 予約可
      calendar.appendChild(cell);
    }
  }

  // 週ラベル更新
  const endDate = new Date(baseDate);
  endDate.setDate(baseDate.getDate() + 6);
  document.getElementById("weekLabel").textContent =
    `${formatDate(baseDate)} ～ ${formatDate(endDate)}`;
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