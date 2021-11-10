import axios from 'axios';

const api = axios.create({
  baseURL: 'https://webhook.site/ce8cd931-b67f-494d-a8b2-77e28122b98e',
});
/* axios.post('https://webhook.site/ce8cd931-b67f-494d-a8b2-77e28122b98e', article)
 */
export default api;