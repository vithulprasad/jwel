import axios from "axios";
const baseUrl = "http://localhost:8088/api/";

// Events

export const getAllEvents = async () => {
  return (await axios.get(`${baseUrl}get_all_events`)).data;
};

export const getOneEvent = async (id) => {
  return await axios.get(`${baseUrl}get_event/${id}`);
};

export const createEvent = async (eventData) => {
  return await axios.post(`${baseUrl}create_event`, eventData);
};

// Users

export const createUser = async (formData) => {
  return await axios.post(`${baseUrl}create_student`, formData);
};
export const getAllStudents = async (formData) => {
  return (await axios.get(`${baseUrl}get_all_students`)).data;
};
