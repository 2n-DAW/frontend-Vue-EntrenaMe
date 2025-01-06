import { createStore } from "vuex";

import { sport } from "./Sports";
import { activity } from "./Activities";
import { auth } from "./Auth";
import { courtHour } from "./CourtsHours";
import { booking } from "./Bookings";
import { comment } from "./Comments";



export default createStore({
  modules: {
    sport,
    activity,
    auth,
    courtHour,
    booking,
    comment
  }
});
