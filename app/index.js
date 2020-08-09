import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { me as device } from "device";
import { goals } from "user-activity";
import { display } from "display";

import * as util from "../common/utils";
import * as stats from "../common/stats";
import * as hr from "../common/hr";

const TRACKER_WIDTH = device.screen.width * 0.9;

clock.granularity = "minutes";

const dateElmt   = document.getElementById("date");
const hours1Elmt = document.getElementById("hourDigit1");
const hours2Elmt = document.getElementById("hourDigit2");
const mins1Elmt  = document.getElementById("minDigit1");
const mins2Elmt  = document.getElementById("minDigit2");

const heartRateElmt        = document.getElementById("hr");
const floorsClimbedElmt    = document.getElementById("floorsClimbed");
const distanceTraveledElmt = document.getElementById("distanceTraveled");

const activeMinsElmt = document.getElementById("activeMins");
const calsElmt       = document.getElementById("calsBurned");
const stepsElmt      = document.getElementById("steps");


const stepsGoalElmt  = document.getElementById("stepsGoalBar");

const activeProgressBarElmt = document.getElementById("activeProgressBar");
const calsProgressBarElmt   = document.getElementById("calsProgressBar");
const stepsProgressBarElmt  = document.getElementById("stepsProgressBar");

const activePctElmt = document.getElementById("activePct");
const calsPctElmt   = document.getElementById("calsPct");
const stepsPctElmt  = document.getElementById("stepsPct");

const trackerSectionElmt    = document.getElementById("trackerSection");
trackerSectionElmt.width = TRACKER_WIDTH;

function setHeartRateDisplay(hrText) {
  heartRateElmt.text = hrText;
}
setHeartRateDisplay('--');
hr.linkHeartRate(setHeartRateDisplay);

clock.ontick = (evt) => {

  let timeBits = util.getTimeBits(evt.date, preferences.clockDisplay);
  dateElmt.text   = `${timeBits["day"]} ${timeBits["date"]}`;
  hours1Elmt.text = timeBits["hoursTens"];
  hours2Elmt.text = timeBits["hoursUnits"];
  mins1Elmt.text  = timeBits["minuteTens"];
  mins2Elmt.text  = timeBits["minuteUnits"];
  
  floorsClimbedElmt.text    = stats.getFloorsClimbed();
  distanceTraveledElmt.text = stats.getDistanceWithUnit();

  activeMinsElmt.text = stats.getActiveMinutes();
  calsElmt.text       = stats.getCaloriesBurned();
  stepsElmt.text      = stats.getStepsDone();

  let activeMins = stats.getActiveProgress(TRACKER_WIDTH);
  let calories   = stats.getCalsProgress(TRACKER_WIDTH);
  let steps      = stats.getStepsProgress(TRACKER_WIDTH);
  activeProgressBarElmt.width = activeMins[0];
  calsProgressBarElmt.width   = calories[0];
  stepsProgressBarElmt.width  = steps[0];
 
  activePctElmt.text = activeMins[1];
  calsPctElmt.text   = calories[1];
  stepsPctElmt.text  = steps[1];
}