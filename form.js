const urlParams = new URLSearchParams(window.location.search);
const selectedDate = urlParams.get("date");
const selectedTime = urlParams.get("time");

const datetime = `${selectedDate} ${selectedTime}`;
document.getElementById("selected-datetime").textContent = datetime;
document.getElementById("datetime").value = datetime;

document.getElementById("reserveForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData.entries());

  await fetch("https://script.google.com/macros/s/�y���Ȃ���WebAppURL�z/exec", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });

  alert("���\�񂠂肪�Ƃ��������܂��I���M���������܂����B");
  location.href = "index.html";
});