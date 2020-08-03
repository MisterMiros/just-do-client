import { environment } from "../environments/environment";

const API_URL_LOCAL = environment.apiSource;
export const API_URL = API_URL_LOCAL;

const TOKEN_LOCAL = 'token';
export const TOKEN = TOKEN_LOCAL;

const AUTHENTICATED_USER_LOCAL = "user";
export const AUTHENTICATED_USER = AUTHENTICATED_USER_LOCAL;

const DATE_FORMAT_LOCAL = 'yyyy-MM-ddTHH:mm';
export const DATE_FORMAT = DATE_FORMAT_LOCAL;
