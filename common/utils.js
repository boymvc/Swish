export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function getDayOfWeek (i) {
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[i];
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getDigitAtPosition(num, pos) {
  return num.toString().substring(pos, pos+1);
}

export function getTimeBits (dateObj, display) {
  let hours = dateObj.getHours();
  if (display === "12h") {
    hours = hours % 12 || 12;
  }
  hours = zeroPad(hours);

  let mins = zeroPad(dateObj.getMinutes());
  
  return {'date'        : dateObj.getDate(),
          'day'         : getDayOfWeek(dateObj.getDay()),
          'hoursTens'    : getDigitAtPosition(hours, 0),
          'hoursUnits'  : getDigitAtPosition(hours, 1),
          'minuteTens'  : getDigitAtPosition(mins, 0),
          'minuteUnits' : getDigitAtPosition(mins, 1)
         };
}