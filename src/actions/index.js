import spotify, { accessToken } from "../apis/spotify";

export const fetchTracks = () => async dispatch => {
  const response = await spotify.get("/me/top/tracks", {
    headers: { Authorization: "Bearer " + accessToken }
  });

  dispatch({
    type: "FETCH_TRACKS",
    payload: response.data.items
  });
};

export const fetchArtists = () => async dispatch => {
  const response = await spotify.get("/me/top/artists", {
    headers: { Authorization: "Bearer " + accessToken }
  });

  dispatch({
    type: "FETCH_ARTISTS",
    payload: response.data.items
  });
};

export const fetchFeature = id => async dispatch => {
  const response = await spotify.get(`/audio-features/${id}`, {
    headers: { Authorization: "Bearer " + accessToken }
  });

  dispatch({
    type: "FETCH_FEATURES",
    payload: response.data
  });
};

export const fetchUser = () => async dispatch => {
  const response = await spotify.get("/me", {
    headers: { Authorization: "Bearer " + accessToken }
  });

  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};