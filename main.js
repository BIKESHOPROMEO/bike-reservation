const calendar = document.getElementById("calendar");

// 日付取得（今日から7日）
const today = new Date();
const days = [];
for (let i = 0; i < 7; i++) {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  const dayStr = `${d.getMonth() + 1}/${d.getDate()}（${["日","月","火","水","木","金","土"][d.getDay()]}）`;
  days.push({ date: d, label: dayStr });
}

// ヘッダー行：空セル + 7日分
calendar.appendChild(makeCell("時間", "day-header"));
days.forEach(d => {
  const className = d.date.getDay() === 6 ? "day-header saturday"
                  : d.date.getDay() === 0 ? "day-header sunday"
                  : "day-header";
  calendar.appendChild(makeCell(d.label, className));
});

// 10:00～18:00まで1時間おき
for (let hour = 10; hour <= 18; hour++) {
  // 時間ラベル（左端）
  calendar.appendChild(makeCell(`${hour}:00`, "time-slot"));
  for (let i = 0; i < 7; i++) {
    calendar.appendChild(makeCell("", "time-slot")); // 予約枠
  }
}

function makeCell(content, className) {
  const cell = document.createElement("div");
  cell.className = className;
  cell.textContent = content;
  return cell;
}