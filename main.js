const calendar = document.getElementById("calendar");
let currentDate = new Date();

function renderCalendar(baseDate) {
  calendar.innerHTML = "";

  const startOfWeek = getSunday(baseDate);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    days.push({
      date: d,
      label: `${d.getMonth() + 1}/${d.getDate()}（${["日","月","火","水","木","金","土"][d.getDay()]}）`,
      className: d.getDay() === 6 ? "header saturday" : d.getDay() === 0 ? "header sunday" : "header"
    });
  }

  // ヘッダー行
  calendar.appendChild(makeCell("時間", "header"));
  days.forEach(d => calendar.appendChild(makeCell(d.label, d.className)));

  // 時間行（10:00?18:00）
  for (let hour = 10; hour <= 18; hour++) {
    calendar.appendChild(makeCell(`${hour}:00`, "cell"));
    for (let i = 0; i < 7; i++) {
      const mark = Math.random() > 0.5 ? "◎" : "×"; // デモ用
      calendar.appendChild(makeCell(mark, "cell"));
    }
  }
}

function makeCell(content, className) {
  const cell = document.createElement("div");
  cell.className = className;
  cell.textContent = content;
  return cell;
}

function getSunday(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day); // 日曜まで戻す
  return d;
}

// ボタン操作
document.getElementById("prevWeek").addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() - 7);
  renderCalendar(currentDate);
});

document.getElementById("nextWeek").addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() + 7);
  renderCalendar(currentDate);
});

// 初期表示
renderCalendar(currentDate);