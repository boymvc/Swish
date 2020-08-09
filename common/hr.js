import { me as appbit } from "appbit";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";

export function linkHeartRate (displayHR) {
  console.log("Permissions are: " + appbit.permissions.granted("access_heart_rate"));

  if (HeartRateSensor) {
    console.log("This device has a HeartRateSensor!");
    const hrm = new HeartRateSensor({ frequency: 1 });

    hrm.addEventListener("reading", () => { 
      let hr = hrm.heartRate;
      displayHR(hr);
      console.log(`Current heart rate: ${hr}`);
    });

    if (BodyPresenceSensor) {
      const body = new BodyPresenceSensor();
      body.addEventListener("reading", () => {
        if (!body.present) {
          hrm.stop();
          displayHR('--');
        } else {
          hrm.start();
        }
      });
      body.start();
    }

    display.addEventListener("change", () => {
      display.on ? hrm.start() : hrm.stop();
    });
    hrm.start();
  }
}