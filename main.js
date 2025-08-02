document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  const prevWeekBtn = document.getElementById("prevWeek");
  const nextWeekBtn = document.getElementById("nextWeek");

  let currentDate = new Date();

  function getStartOfWeek(date) {
    const day = date.getDay(); // 0(日)?6(土)
    const diff = date.getDate() - day; // 週の始まり（日曜）
    return new Date(date.setDate(diff));
  }

  function renderCalendar(date) {
    calendar.innerHTML = "";

    const startOfWeek = getStartOfWeek(new Date(date));
    const hours = [...Array(10)].map((_, i) => `${i + 9}:00`); // 9?18時

    // ヘッダー行（曜日）
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    calendar.appendChild(createCell("", "header"));
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      calendar.appendChild(createCell(`${days[d.getDay()]}\n${d.getMonth() + 1}/${d.getDate()}`, "header"));
    }

    // 時間帯ごとのセル
    for (const hour of hours) {
      calendar.appendChild(createCell(hour, "header"));
      for (let i = 0; i < 7; i++) {
        calendar.appendChild(createCell("○", "cell"));
      }
    }
  }

  function createCell(text, className) {
    const cell = document.createElement("div");
    cell.className = className;
    cell.textContent = text;
    return cell;
  }

  prevWeekBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 7);
    renderCalendar(currentDate);
  });

  nextWeekBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 7);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});