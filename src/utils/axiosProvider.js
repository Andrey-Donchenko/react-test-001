import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl';

export const HTTP = axios.create({
  baseURL: BASE_URL
})
