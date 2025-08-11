const BaseUrl = 'https://notes-api.dicoding.dev/v2';

export const NotesEndPoint = {
  CREATE: `${BaseUrl}/notes`,
  GET_ALL: `${BaseUrl}/notes`,
  GET_ARCHIVED: `${BaseUrl}/notes/archived`,
  GET_SINGLE: (id) => `${BaseUrl}/notes/${id}`,
  ARCHIVE: (id) => `${BaseUrl}/notes/${id}/archive`,
  UNARCHIVE: (id) => `${BaseUrl}/notes/${id}/unarchive`,
  DELETE: (id) => `${BaseUrl}/notes/${id}`,
};
