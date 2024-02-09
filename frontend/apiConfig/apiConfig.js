import axios from "axios";
const baseUrl = "http://localhost:8088/api/";

export const getAllEvents = async () => {
  return (await axios.get(`${baseUrl}get_all_events`)).data;
};

export const getOneEvent = async (id) => {
  return await axios.get(`${baseUrl}get_event/${id}`);
};

export const createEvent = async (eventData) => {
  return await axios.post(`${baseUrl}create_event`, eventData);
};
