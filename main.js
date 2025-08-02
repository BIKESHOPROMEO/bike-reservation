// 曜日取得関数
function getWeekdayString(date) {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return weekdays[date.getDay()];
}

// 仮の空き状況（false: ×）
const availability = {
  // 例：日曜と水曜の一部に×
  '2025-08-03_10:00': false,
  '2025-08-03_11:00': false,
  '2025-08-06_13:00': false,
};

// カレンダー生成処理
function generateCalendar() {
  const calendarDiv = document.getElementById('calendar');
  const table = document.createElement('table');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const emptyCell = document.createElement('th');
  emptyCell.textContent = '時間';
  headerRow.appendChild(emptyCell);

  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const weekday = getWeekdayString(date);
    const dateStr = `${date.getDate()}（${weekday}）`;

    const th = document.createElement('th');
    th.textContent = dateStr;
    th.className = date.getDay() === 0 ? 'sunday' : date.getDay() === 6 ? 'saturday' : '';

    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  for (let hour = 10; hour <= 18; hour++) {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = `${hour}:00`;
    row.appendChild(timeCell);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      const key = `${dateKey}_${hour}:00`;
      const isAvailable = availability[key] ?? true;

      const td = document.createElement('td');
      td.textContent = isAvailable ? '◎' : '×';
      if (!isAvailable) td.classList.add('unavailable');
      row.appendChild(td);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  calendarDiv.appendChild(table);
}

generateCalendar();