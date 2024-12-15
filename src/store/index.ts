import { createStore } from "vuex";

import { sport } from "./Sports";
import { activity } from "./Activities";
import { auth } from "./Auth";



export default createStore({
  modules: {
    sport,
    activity,
    auth,
  }
});
