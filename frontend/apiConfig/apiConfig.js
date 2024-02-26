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
export const getAllStudents = async () => {
  return (await axios.get(`${baseUrl}get_all_students`)).data;
};
export const updateUserStatus = async (userId, newStatus) => {
  return await axios.put(`${baseUrl}update_user_status/${userId}`, {
    userStatus: newStatus,
  });
};

//Schools
export const createSchool = async (formData) => {
  return await axios.post(`${baseUrl}create_school`, formData);
};
export const getAllSchools = async () => {
  return (await axios.get(`${baseUrl}get_all_schools`)).data;
};
export const getUserBySchool = async (schoolId) => {
  console.log(schoolId,"school Id in the apiconfig")
  return await axios.get(`${baseUrl}get_users/${schoolId}`);
};
// Mininstry

export const createMinistry = async (formData) => {
  return await axios.post(`${baseUrl}create_ministry`, formData);
};
export const getAllMinstry = async () => {
  return (await axios.get(`${baseUrl}get_all_ministry`)).data;
};
