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

    // 時間ごとの行
    for (let hour = 10; hour <= 18; hour++) {
      const row = document.createElement("tr");

      // 左端：時間表示
      const timeCell = document.createElement("td");
      timeCell.innerText = `${hour}:00`;
      row.appendChild(timeCell);

      // ◎×セル（ランダム or プレースホルダー）
      for (let i = 0; i < 7; i++) {
        const cell = document.createElement("td");
        cell.innerText = Math.random() > 0.5 ? "◎" : "×"; // 仮表示
        row.appendChild(cell);
      }

      calendarTable.appendChild(row);
    }
  }

  function getWeekdayColor(day) {
    if (day === 0) return "sunday";   // 赤
    if (day === 6) return "saturday"; // 青
    return "";                         // 平日は黒
  }

  const baseDate = getSunday(new Date());
  generateCalendar(baseDate);
});