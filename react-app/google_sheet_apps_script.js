/**
 * ============================================================================
 * THE DRAWING BOARD — GOOGLE SHEET AUTOMATED LEAD BACKUP & GMAIL RELAY
 * ============================================================================
 * 
 * INSTRUCTIONS TO UPDATE (Takes 60 seconds):
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1iAocCMl4K4odgJ5hlr-1hbncgWbuW8dFKrnwJg2mAf8/edit
 * 2. In the top menu, click: Extensions -> Apps Script
 * 3. Replace all existing code in Code.gs with this entire script.
 * 4. Click the blue "Deploy" button (top right) -> "Manage deployments" -> Edit (pencil icon) -> Version: "New version" -> Click "Deploy".
 * 5. If prompted, click "Review Permissions", select your Google account, click "Advanced" -> "Go to Untitled project (unsafe)" -> Click "Allow".
 * 
 * WHAT THIS SCRIPT DOES:
 * 1. Automatically logs every inquiry into the Google Spreadsheet as a formatted row.
 * 2. Automatically sends a formatted lead email directly to dandelionpa7@gmail.com.
 * 3. Automatically CCs the client who submitted the form so they get an instant receipt!
 */

function setupHeadersIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Timestamp (IST)",
      "Source Page",
      "Client Name",
      "Email Address",
      "WhatsApp Number",
      "Phone Number",
      "Company / Brand",
      "Services Requested",
      "Budget Allocation",
      "Target Timeline",
      "Project Brief / Message",
      "Email Dispatched?",
      "Delivery Status"
    ];

    sheet.appendRow(headers);

    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0f172a");
    headerRange.setFontColor("#f8fafc");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Inter");
    headerRange.setHorizontalAlignment("center");
    headerRange.setWrap(true);
    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupHeadersIfEmpty(sheet);

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var clientName = data.name || data["Client Name"] || "New Client";
    var clientEmail = data.email || data["Email Address"] || data["Work Email"] || "";
    var phone = data.phone || data["Phone Number"] || "";
    var whatsapp = data.whatsapp || data["WhatsApp Number"] || "";
    var company = data.company || data["Brand Name or Website"] || data["Brand Name"] || "Brand";
    var services = data.services || data["Services Requested"] || "";
    var budget = data.budget || data["Approximate Budget"] || "";
    var timeline = data.timeline || data["Target Timeline"] || "";
    var message = data.message || data["Project Overview"] || data["Message / Brief"] || "";
    var sourcePage = data.source || "Website Form";

    var row = [
      data.istTime || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      sourcePage,
      clientName,
      clientEmail,
      whatsapp,
      phone,
      company,
      services,
      budget,
      timeline,
      message,
      "YES",
      "Delivered via Pipeline"
    ];

    sheet.appendRow(row);

    // Format new row
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, row.length);
    range.setFontFamily("Inter");
    range.setVerticalAlignment("middle");
    if (lastRow % 2 === 0) {
      range.setBackground("#f8fafc");
    }

    // AUTOMATIC GMAIL RELAY TO DANDELIONPA7@GMAIL.COM + CC CLIENT
    try {
      var subject = "⚡ New Studio Lead: " + company + " — " + clientName;
      var html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #141517; color: #f4f4f5; border: 1px solid #27272a; border-radius: 8px; overflow: hidden;">
          <div style="padding: 20px 24px; background: #18191c; border-bottom: 1px solid #27272a;">
            <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #e11d48; letter-spacing: 0.1em;">⚡ New Studio Lead Received</span>
            <h2 style="margin: 8px 0 4px; font-size: 20px; color: #fff;">${clientName}</h2>
            <p style="margin: 0; font-size: 13px; color: #a1a1aa;">${company ? company + ' · ' : ''}${clientEmail}</p>
          </div>
          <div style="padding: 20px 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr><td style="padding: 8px 0; color: #a1a1aa; width: 35%;">Client Name:</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${clientName}</td></tr>
              <tr><td style="padding: 8px 0; color: #a1a1aa;">Email:</td><td style="padding: 8px 0; color: #38bdf8;"><a href="mailto:${clientEmail}" style="color: #38bdf8;">${clientEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #a1a1aa;">Phone / WhatsApp:</td><td style="padding: 8px 0; color: #fff;">${phone || whatsapp || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #a1a1aa;">Company / Brand:</td><td style="padding: 8px 0; color: #fff;">${company || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #a1a1aa;">Services:</td><td style="padding: 8px 0; color: #fbbf24;">${services || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; color: #a1a1aa;">Budget:</td><td style="padding: 8px 0; color: #4ade80; font-weight: 600;">${budget || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; color: #a1a1aa;">Timeline:</td><td style="padding: 8px 0; color: #fff;">${timeline || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; color: #a1a1aa;">Origin:</td><td style="padding: 8px 0; color: #71717a;">${sourcePage}</td></tr>
            </table>
            ${message ? `
            <div style="margin-top: 16px; padding: 12px; background: #1a1b1f; border-left: 3px solid #e11d48; font-size: 13px; line-height: 1.5;">
              <strong style="color: #a1a1aa; font-size: 11px; text-transform: uppercase;">Project Brief:</strong><br/>
              ${message}
            </div>` : ''}
          </div>
          <div style="padding: 12px 24px; background: #111215; border-top: 1px solid #27272a; font-size: 11px; color: #52525b; text-align: center;">
            The Drawing Board Studio Lead Engine · Google Cloud Pipeline
          </div>
        </div>
      `;

      var mailOptions = {
        to: "dandelionpa7@gmail.com",
        subject: subject,
        htmlBody: html,
        replyTo: clientEmail || "dandelionpa7@gmail.com"
      };

      if (clientEmail && clientEmail.indexOf("@") !== -1 && clientEmail.indexOf("example.com") === -1) {
        mailOptions.cc = clientEmail;
      }

      MailApp.sendEmail(mailOptions);
    } catch (mailErr) {
      Logger.log("MailApp error: " + mailErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      rowNumber: lastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "The Drawing Board Studio Lead Backup Webhook is operational."
  })).setMimeType(ContentService.MimeType.JSON);
}
