import { http, HttpResponse } from 'msw';

// Example handler for a GET request
const getExampleHandler = http.get('https://api.example.com/user', () => {
  return HttpResponse.json({
    firstName: 'John',
    lastName: 'Maverick',
  });
});

// Example handler for a POST request
const postExampleHandler = http.post('https://api.example.com/login', () => {
  return HttpResponse.json({
    id: 'abc-123',
    token: 'fake-jwt-token',
  });
});

export const handlers = [getExampleHandler, postExampleHandler];
