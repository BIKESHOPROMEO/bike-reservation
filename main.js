const calendarTable = document.getElementById("calendar-table");
const weekRange = document.getElementById("week-range");

let currentDate = new Date(); // 今日基準の週を表示

function changeWeek(offset) {
  currentDate.setDate(currentDate.getDate() + offset * 7);
  renderCalendar();
}

function renderCalendar() {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // 日曜日開始
  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);
    days.push(day);
  }

  const times = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
  calendarTable.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.appendChild(document.createElement("th")); // 時間列のラベル

  days.forEach(day => {
    const th = document.createElement("th");
    const weekday = ["日","月","火","水","木","金","土"][day.getDay()];
    th.textContent = `${day.getMonth()+1}/${day.getDate()}(${weekday})`;
    headerRow.appendChild(th);
  });

  calendarTable.appendChild(headerRow);

  times.forEach(time => {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    timeCell.textContent = time;
    row.appendChild(timeCell);

    days.forEach(day => {
      const cell = document.createElement("td");
      const isoDate = day.toISOString().split("T")[0];

      const available = Math.random() > 0.3; // ダミーで◎×判定（後で置き換え可）
      if (available) {
        cell.classList.add("selectable");
        cell.textContent = "◎";
        cell.onclick = () => {
          const params = new URLSearchParams({ date: isoDate, time });
          location.href = `form.html?${params.toString()}`;
        };
      } else {
        cell.classList.add("unavailable");
        cell.textContent = "×";
      }

      row.appendChild(cell);
    });

    calendarTable.appendChild(row);
  });

  const first = days[0];
  const last = days[6];
  weekRange.textContent = `${first.getMonth()+1}/${first.getDate()} ? ${last.getMonth()+1}/${last.getDate()}`;
}

renderCalendar();