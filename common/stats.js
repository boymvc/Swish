import { me as appbit } from "appbit";
import { today } from "user-activity";
import { goals } from "user-activity";
import { units } from "user-settings";
import * as util from "../common/utils";

export function getStepsDone() {
  var steps = 0;
  if (appbit.permissions.granted("access_activity")) {
     steps = util.numberWithCommas(today.adjusted.steps);
  }
  return steps;
}

export function getCaloriesBurned() {
  var cals = 0;
  if (appbit.permissions.granted("access_activity")) {
     cals = util.numberWithCommas(today.adjusted.calories);
  }
  return cals;
}

export function getActiveMinutes() {
  var aMins = 0;
  if (appbit.permissions.granted("access_activity")) {
      aMins = (today.adjusted.activeMinutes);
  }
  return aMins;
}

export function getFloorsClimbed () {
  var floors = 0;
  if (appbit.permissions.granted("access_activity")) {
      floors = today.adjusted.elevationGain;
  }
  return floors;
}

function getDistanceTraveled () {
  var dist = 0.0;
  if (appbit.permissions.granted("access_activity")) {
     dist = (today.adjusted.distance);
  }
  return dist;
}

export function getStepsProgress (scale) {
  return statToProgress(today.adjusted.steps, goals.steps, scale);
}

export function getCalsProgress (scale) {
  return statToProgress(today.adjusted.calories, goals.calories, scale);
}

export function getActiveProgress (scale) {
  return statToProgress(today.adjusted.activeMinutes, goals.activeMinutes, scale);
}

export function getDistanceWithUnit () {
  var dividend = (units.distance === 'metric') ? 1000 : 1609;
  var distance = getDistanceTraveled() / dividend;  
  return distance.toFixed(1);
}

function statToProgress(done, goal, scale) {
  var progress =  (done / goal);
  var percent = Math.round(progress * 100);

  progress = (progress > 1) ? 1 : progress;
  progress = Math.round(progress * scale);

  percent = (percent > 100) ?  percent + '%' : '';
  console.log(percent)
  return [progress, percent];
}
