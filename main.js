td.addEventListener("click", () => {
  const selectedDate = td.dataset.date;
  const selectedTime = td.dataset.time;
  const formPage = `form.html?date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}`;
  window.location.href = formPage;
});