/**
 * FD Web Designs: bookings log
 *
 * Saves every request sent from the website form as a row on the "Bookings" tab,
 * and every tap on a phone number / Call button on the "Calls" tab.
 * Setup: in the Sheet, Extensions > Apps Script, paste this file, then
 * Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Copy the web app URL into `sheetLog` in src/data/site.js.
 */
var BOOKINGS = { name: "Bookings", headers: ["Received", "Type", "Name", "Business", "Email", "Phone", "Business type",
  "Current website", "Looking for", "Package", "Details", "Device", "Page", "Status"] };
var CALLS = { name: "Calls", headers: ["Tapped Call", "Button", "Device", "Page"] };

function tab_(ss, spec) {
  var sh = ss.getSheetByName(spec.name) || ss.insertSheet(spec.name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(spec.headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, spec.headers.length).setFontWeight("bold");
  }
  return sh;
}

function doPost(e) {
  var p = (e && e.parameter) || {};
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Text only: a value starting with = + - @ would otherwise run as a formula.
  var clean = function (v) {
    v = String(v || "").slice(0, 2000);
    return /^[=+\-@]/.test(v) ? "'" + v : v;
  };
  if (p.source === "Call button") {
    tab_(ss, CALLS).appendRow([new Date(), clean(p.button), clean(p.device), clean(p.page)]);
  } else {
    tab_(ss, BOOKINGS).appendRow([new Date(), clean(p.source), clean(p.name), clean(p.business), clean(p.email),
      clean(p.phone), clean(p.business_type), clean(p.website), clean(p.looking_for), clean(p.package),
      clean(p.message), clean(p.device), clean(p.page), "New"]);
  }
  return ContentService.createTextOutput("ok");
}
