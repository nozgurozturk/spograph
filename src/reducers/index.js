import { combineReducers } from "redux";
import trackReducer from "./trackReducer";
import artistReducer from "./artistReducer";
import featureReducer from "./featureReducer";
import userReducer from "./userReducer";

export default combineReducers({
  user:userReducer,
  tracks: trackReducer,
  artists: artistReducer,
  features: featureReducer
});
