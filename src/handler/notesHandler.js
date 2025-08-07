import { NotesEndPoint } from '../api/notesApi.js'

export const getAllNotes = async () => {
  try {
    const response = await fetch(NotesEndPoint.GET_ALL);
    const responseJson = await response.json();

    if (responseJson.data) {
      responseJson.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return responseJson;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': '12345',
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(NotesEndPoint.CREATE, options);
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message);
    }

    return responseJson;
  } catch (error) {
    throw error;
  }
};

export const getNotesArchived = async () => {
    try{
        const response = await fetch(NotesEndPoint.GET_ARCHIVED);
        const responseJson = await response.json();

        if (responseJson.data) {
        responseJson.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return responseJson;
    } catch(error){
        throw(error);
    }
};

export const getSingleNote = async (id) => {
  try {
    const response = await fetch(NotesEndPoint.GET_SINGLE(id));
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
};