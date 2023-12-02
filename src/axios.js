import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/challenge-ec988/us-central1/api", // The API (cloud function) URL
});

export default instance;
