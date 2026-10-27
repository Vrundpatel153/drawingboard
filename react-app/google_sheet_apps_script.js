/**
 * ============================================================================
 * THE DRAWING BOARD — GOOGLE SHEET AUTOMATED LEAD BACKUP APPS SCRIPT
 * ============================================================================
 * 
 * INSTRUCTIONS TO DEPLOY (Takes 60 seconds):
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1iAocCMl4K4odgJ5hlr-1hbncgWbuW8dFKrnwJg2mAf8/edit
 * 2. In the top menu, click: Extensions -> Apps Script
 * 3. Delete any default code in Code.gs, and paste this entire script.
 * 4. Click the blue "Deploy" button (top right) -> "New deployment"
 * 5. Select type: "Web app" (click the gear icon beside "Select type" if needed)
 * 6. Set Description: "Studio Lead Backup Webhook"
 * 7. Set "Execute as": "Me"
 * 8. Set "Who has access": "Anyone" (CRITICAL: must be "Anyone" so the serverless function can post)
 * 9. Click "Deploy", approve permissions if prompted, and copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 10. Add that URL to Vercel Environment Variables as GOOGLE_SHEET_WEBHOOK_URL and into react-app/.env.local!
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
      "Resend Delivery ID"
    ];

    sheet.appendRow(headers);

    // Style the header row
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

    var row = [
      data.istTime || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.source || "Website Form",
      data.name || data["Client Name"] || "New Client",
      data.email || data["Email Address"] || data["Work Email"] || "",
      data.whatsapp || data["WhatsApp Number"] || "",
      data.phone || data["Phone Number"] || "",
      data.company || data["Brand Name or Website"] || data["Brand Name"] || "",
      data.services || data["Services Requested"] || "",
      data.budget || data["Approximate Budget"] || "",
      data.timeline || data["Target Timeline"] || "",
      data.message || data["Project Overview"] || data["Message / Brief"] || "",
      data.emailDispatched ? "YES" : "Pending",
      data.emailId || "N/A"
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
