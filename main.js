function doPost(e) {
  const sheet = SpreadsheetApp.openById("【スプレッドシートID】").getSheetByName("予約");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),  // 受付日時
    data.date,
    data.time,
    data.name,
    data.phone
  ]);

  // メール送信（オプション）
  MailApp.sendEmail({
    to: "店舗@example.com",
    subject: "新しい予約が入りました",
    htmlBody: `日時: ${data.date} ${data.time}<br>名前: ${data.name}<br>電話番号: ${data.phone}`
  });

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}