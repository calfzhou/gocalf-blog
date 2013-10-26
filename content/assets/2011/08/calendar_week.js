function isEmpty(elem) {
  return !elem.innerText || elem.innerText.charCodeAt(0) == 160;
}

function SpanInfo(rowSpan, colSpan) {
  this.rowSpan = rowSpan;
  this.colSpan = colSpan;
}

function skipSpan(colId, spanInfo) {
  while (spanInfo[colId] != undefined) {
    var offset = spanInfo[colId].colSpan;
    spanInfo[colId].rowSpan -= 1;
    if (spanInfo[colId].rowSpan == 0) {
      spanInfo[colId] = undefined;
    }
    colId += offset;
  }
  return colId;
}

function updateTableCellIndex(tableElem) {
  var spanInfo = new Array();
  var rows = new Array();
  var trs = $(tableElem).find("tr");
  for (var trId = 0; trId < trs.length; ++trId) {
    var cells = new Array();
    rows[trId] = cells;
    var tds = $(trs[trId]).find("td,th");
    var colId = 0;
    for (var tdId = 0; tdId < tds.length; ++tdId, ++colId) {
      colId = skipSpan(colId, spanInfo);
      var td = tds[tdId];
      //td.innerText = trId + "," + colId;
      td.rowId = trId;
      td.colId = colId;
      cells[colId] = td;
      if (td.rowSpan > 1) {
        spanInfo[colId] = new SpanInfo(td.rowSpan - 1, td.colSpan);
      }
      if (td.colSpan > 1) {
        colId += td.colSpan - 1;
      }
    }  // end of for each td
    colId = skipSpan(colId, spanInfo);
  }  // end of for each tr
  return rows;
}

function Point(rowId, colId) {
  this.rowId = rowId;
  this.colId = colId;
}

function lookupDayOfWeek() {
  $("td.actived").removeClass(activedClassName);
  var crossFrom = new Point(0, 0);
  if (currYear1 != undefined) {
    crossFrom.rowId = currYear1.rowId;
    var colIdTo = (currYear2 == undefined) ? 10 : currYear2.colId;
    for (var colId = currYear1.colId; colId <= colIdTo; ++colId) {
      $(rows[currYear1.rowId][colId]).addClass(activedClassName);
    }
  }
  if (currYear2 != undefined) {
    crossFrom.colId = currYear2.colId;
    var rowIdTo = (currYear1 == undefined) ? 25 : currYear1.rowId;
    for (var rowId = currYear2.rowId; rowId <= rowIdTo; ++rowId) {
      $(rows[rowId][currYear2.colId]).addClass(activedClassName);
    }
  }
  var crossTo = new Point(0, 0);
  if (currMonth != undefined) {
    if (crossFrom.rowId > 0 && crossFrom.colId > 0) {
      crossTo.rowId = currMonth.rowId;
      var colOffset = currMonth.rowId - crossFrom.rowId;
      if (colOffset < 0) { colOffset += 7; }
      crossTo.colId = crossFrom.colId + colOffset;
      if (crossTo.colId > 10) { crossTo.colId -= 7; }
    }
    var colIdFrom = (crossTo.colId == 0) ? 4 : crossTo.colId;
    for (var colId = colIdFrom; colId <= currMonth.colId; ++colId) {
      $(rows[currMonth.rowId][colId]).addClass(activedClassName);
    }
  }
  if (currDay != undefined) {
    var colIdFrom = (crossTo.colId == 0) ? 4 : crossTo.colId;
    for (var colId = colIdFrom; colId <= currDay.colId; ++colId) {
      $(rows[currDay.rowId][colId]).addClass(activedClassName);
    }
    if (crossTo.colId > 0) {
      var rowIdFrom = crossTo.rowId;
      for (var rowId = rowIdFrom; rowId <= currDay.rowId; ++rowId) {
        $(rows[rowId][crossTo.colId]).addClass(activedClassName);
      }
    }
  }
}

function isLeapYear(year) {
  return new Date(year, 1, 29).getDate() == 29;
}

function initMonthInfo() {
  var monthOffsets = new Array();
  var buffer = new Array();
  for (var i = 0; i < 7; ++i) { buffer[i] = 0; }
  var nonLeapYear = 2001;
  var firstDay = new Date(nonLeapYear, 0, 1);
  for (var month = 1; month <= 2; ++month) {
    var monthDayOffset = (new Date(nonLeapYear, month - 1, 1) - firstDay) / 86400000;
    monthDayOffset += 6;
    var rowId = monthDayOffset % 7;
    monthOffsets[12 + month - 1] = new Point(rowId, buffer[rowId]++);
  }
  for (var month = 1; month <= 12; ++month) {
    var monthDayOffset = (new Date(nonLeapYear, month - 1, 1) - firstDay) / 86400000;
    var rowId = monthDayOffset % 7;
    monthOffsets[month - 1] = new Point(rowId, buffer[rowId]++);
  }
  return monthOffsets;
}

var monthOffsets = initMonthInfo();

function lookupGivenDate(date) {
  var year = date.getFullYear();
  var year1 = Math.floor(year / 100);
  var year2 = year % 100;
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var offset = new Point(0, 0);
  offset.rowId = ((year1 % 4) << 1) + 1;
  if (year1 >= 15 && year1 <= 22) {
    offset.colId = Math.floor((year1 - 15) / 4) + 1;
  }
  else {
    offset.colId = 0;
  }
  currYear1 = rows[19 + offset.rowId][1 + offset.colId];
  var year2Expand = Math.floor(year2 / 4) * 5 + (year2 % 4);
  offset.rowId = Math.floor(year2Expand / 7);
  offset.colId = year2Expand % 7;
  currYear2 = rows[1 + offset.rowId][4 + offset.colId];
  offset = monthOffsets[(month <= 2 && isLeapYear(year)) ? 12 + month - 1 : month - 1];
  currMonth = rows[19 + offset.rowId][11 + offset.colId];
  offset.rowId = (day - 1) % 7;
  offset.colId = Math.floor((day - 1) / 7);
  currDay = rows[26 + offset.rowId][11 + offset.colId];
  lookupDayOfWeek();
}

function lookupToday() {
  lookupGivenDate(new Date());
}
