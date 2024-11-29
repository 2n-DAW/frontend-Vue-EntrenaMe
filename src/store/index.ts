import { createStore } from "vuex";

import { sport } from "./Sports";
import { activity } from "./Activities";



export default createStore({
  modules: {
    sport,
    activity,
    
  }
});
