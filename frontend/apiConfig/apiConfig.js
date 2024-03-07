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
  console.log(schoolId, "school Id in the apiconfig");
  return await axios.get(`${baseUrl}get_users/${schoolId}`);
};
// Mininstry

export const createMinistry = async (formData) => {
  return await axios.post(`${baseUrl}create_ministry`, formData);
};
export const getAllMinstry = async () => {
  return (await axios.get(`${baseUrl}get_all_ministry`)).data;
};
// Mentors
export const createMentor = async () => {
  return await axios.post(`${baseUrl}create_mentor`);
};

export const getAllMentors = async () => {
  return (await axios.get(`${baseUrl}get_all_mentors`)).data;
};

// Speakers
export const createSpeaker = async () => {
  return await axios.post(`${baseUrl}create_speaker`);
};

export const getAllSpeakers = async () => {
  return (await axios.get(`${baseUrl}get_all_speakers`)).data;
};

//event_school
export const createEventSchool = async (eventSchoolData) => {
  console.log(eventSchoolData, "event school data of api config");

  return await axios.post(`${baseUrl}create_event_school`, eventSchoolData);
};
// Example of getting all event schools
export const getAllEventSchools = async () => {
  return (await axios.get(`${baseUrl}get_all_event_schools`)).data;
};
//event_mentor
export const createEventMentor = async (eventMentorData) => {
  return await axios.post(`${baseUrl}create_event_mentor`, eventMentorData);
};
//event_speaker
export const createEventSpeaker = async (eventSpeakerData) => {
  return await axios.post(`${baseUrl}create_event_speakers`, eventSpeakerData);
};
//evetn_ministry
export const createEventMinistry = async (eventMinistryData) => {
  return await axios.post(
    `${baseUrl}create_event_ministries`,
    eventMinistryData
  );
};
//event Party Route
export const createEventParty = async (eventPartyData) => {
  return await axios.post(`${baseUrl}create_event_party`, eventPartyData);
};
export const getEventParty = async () => {
  return await axios.get(`${baseUrl}get_all_party`);
};

export const getPartyByEventId = async (id) => {
  return await axios.get(`${baseUrl}get_all_party_eventsId/${id}`);
};

//Event Particapants routes
export const getEventParticapantsByEventId = async (id) => {
  return await axios.get(`${baseUrl}get_eventPartticapants_by_eventId/${id}`);
};
