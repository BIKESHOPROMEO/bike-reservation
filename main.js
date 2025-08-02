document.addEventListener("DOMContentLoaded", function () {
  const calendarTable = document.getElementById("calendar");

  function getSunday(date) {
    const day = date.getDay(); // 0:日曜?6:土曜
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - day);
    return sunday;
  }

  function generateCalendar(baseDate) {
    calendarTable.innerHTML = "";

    // ヘッダー行（曜日）
    const headerRow = document.createElement("tr");
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    for (let i = 0; i < 7; i++) {
      const th = document.createElement("th");
      th.innerText = weekdays[i];
      th.className = getWeekdayColor(i);
      headerRow.appendChild(th);
    }
    calendarTable.appendChild(headerRow);

    // 時間スロット（例：10時?18時）
    for (let hour = 10; hour <= 18; hour++) {
      const row = document.createElement("tr");

      for (let i = 0; i < 7; i++) {
        const cell = document.createElement("td");
        const date = new Date(baseDate);
        date.setDate(date.getDate() + i);
        const displayDate = `${date.getMonth() + 1}/${date.getDate()}`;
        cell.innerHTML = `${displayDate}<br>${hour}:00`;
        row.appendChild(cell);
      }

      calendarTable.appendChild(row);
    }
  }

  function getWeekdayColor(day) {
    if (day === 0) return "sunday";   // 赤
    if (day === 6) return "saturday"; // 青
    return "";                         // その他は黒
  }

  const baseDate = getSunday(new Date());
  generateCalendar(baseDate);
});