// main.js
document.addEventListener("DOMContentLoaded", function () {
  const calendarTable = document.getElementById("calendar");

  function getSunday(date) {
    const day = date.getDay();
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - day);
    return sunday;
  }

  function getWeekdayColor(day) {
    if (day === 0) return "sunday";
    if (day === 6) return "saturday";
    return "";
  }

  function generateCalendar(baseDate) {
    calendarTable.innerHTML = "";

    // ヘッダー行（日付と曜日）
    const headerRow = document.createElement("tr");
    const firstCell = document.createElement("th");
    firstCell.innerText = "時間＼日付";
    headerRow.appendChild(firstCell);

    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + i);
      const weekday = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
      const th = document.createElement("th");
      th.innerText = `${weekday} (${date.getMonth() + 1}/${date.getDate()})`;
      th.className = getWeekdayColor(date.getDay());
      headerRow.appendChild(th);
    }
    calendarTable.appendChild(headerRow);

    // 時間行
    for (let hour = 10; hour <= 18; hour++) {
      const row = document.createElement("tr");
      const timeCell = document.createElement("td");
      timeCell.innerText = `${hour}:00`;
      row.appendChild(timeCell);

      for (let i = 0; i < 7; i++) {
        const cell = document.createElement("td");
        const available = Math.random() > 0.5 ? "◎" : "×"; // 仮ロジック
        cell.innerText = available;
        cell.setAttribute("data-status", available);
        row.appendChild(cell);
      }

      calendarTable.appendChild(row);
    }
  }

  const baseDate = getSunday(new Date());
  generateCalendar(baseDate);
});