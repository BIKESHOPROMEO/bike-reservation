let currentSunday = getSunday(new Date());

function getSunday(date) {
  const day = date.getDay();
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - day);
  return sunday;
}

function formatDate(date) {
  return `${date.getMonth()+1}/${date.getDate()}`;
}

function generateCalendar(baseDate) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  const hours = [];
  for (let h = 10; h <= 18; h++) {
    hours.push(`${h}:00`);
  }

  const table = document.getElementById('calendar');
  table.innerHTML = '';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const firstHeader = document.createElement('th');
  firstHeader.textContent = '時間＼日付';
  headerRow.appendChild(firstHeader);
  dates.forEach(date => {
    const th = document.createElement('th');
    th.textContent = formatDate(date);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  hours.forEach(time => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = time;
    row.appendChild(timeCell);

    dates.forEach(date => {
      const cell = document.createElement('td');
      const button = document.createElement('button');
      button.className = 'slot-button';
      button.textContent = '●';

      button.onclick = () => {
        alert(`${formatDate(date)} ${time} を選択しました`);
        // 遷移処理はここに追加可能（Prefill URLなど）
      };

      cell.appendChild(button);
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  document.getElementById('weekLabel').textContent =
    `${formatDate(dates[0])} ～ ${formatDate(dates[6])}`;
}

document.getElementById('prevWeek').onclick = () => {
  currentSunday.setDate(currentSunday.getDate() - 7);
  generateCalendar(currentSunday);
};

document.getElementById('nextWeek').onclick = () => {
  currentSunday.setDate(currentSunday.getDate() + 7);
  generateCalendar(currentSunday);
};

generateCalendar(currentSunday);