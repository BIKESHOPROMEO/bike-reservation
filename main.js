// 空き状況：true → ◎、false → ×
const availability = {}; // ここに枠ごとの空き状況を登録（例は仮で true にする）

// 曜日を文字で返す関数
function getWeekdayString(date) {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return weekdays[date.getDay()];
}

// カレンダーを作成
function generateCalendar() {
  const calendarDiv = document.getElementById('calendar');
  const table = document.createElement('table');

  // 曜日ヘッダー作成
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const timeHeader = document.createElement('th');
  timeHeader.textContent = '時間';
  headerRow.appendChild(timeHeader);

  for (let i = 0; i < 7; i++) {
    const th = document.createElement('th');
    th.textContent = ['日', '月', '火', '水', '木', '金', '土'][i];
    th.className = i === 0 ? 'sunday' : i === 6 ? 'saturday' : '';
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 日付ごとに時間枠を生成
  const tbody = document.createElement('tbody');
  const today = new Date();

  for (let hour = 10; hour <= 18; hour++) {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = `${hour}:00`;
    row.appendChild(timeCell);

    for (let i = 0; i < 7; i++) {
      const td = document.createElement('td');
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0]; // yyyy-mm-dd
      const key = `${dateStr}_${hour}:00`;
      const isAvailable = availability[key] ?? true; // 未設定なら空きあり

      const weekday = getWeekdayString(date);
      td.textContent = `${date.getDate()}（${weekday}）\n${isAvailable ? '◎' : '×'}`;

      // クラス付け
      td.className = i === 0 ? 'sunday' : i === 6 ? 'saturday' : '';
      if (!isAvailable) td.classList.add('unavailable');

      row.appendChild(td);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  calendarDiv.appendChild(table);
}

generateCalendar();