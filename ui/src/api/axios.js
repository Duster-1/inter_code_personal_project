import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  console.log('Interceptor request - token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log('Interceptor caught error:', error.response?.status);
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refresh_token');
  
          if (refreshToken) {
            const res = await axios.post('http://localhost:3001/auth/refresh', {
              refreshToken,
            });
  
            console.log('Token refreshed:', res.data.access_token);
  
            localStorage.setItem('access_token', res.data.access_token);
            if (res.data.refresh_token) {
              localStorage.setItem('refresh_token', res.data.refresh_token);
            }
  
            // Оновлюємо заголовок в originalRequest перед повтором
            originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;
  
            return api(originalRequest);
          }
        } catch (err) {
          console.error('Refresh token failed', err);
          localStorage.clear();
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
  

function postRecipeWithInterval() {
    setInterval(() => {
      api.post('recipes/', {
        title: "dsfsdf1122dsfdsfdffewhkfwefdskjfbdsf",
        description: "sdfdsfsdf",
        ingredients: ["sfdsfdsf"]
      })
      .then(response => {
        console.log('Recipe posted:', response.data, localStorage.getItem('access_token'));
      })
      .catch(error => {
        console.error('Error posting recipe:', error);
      });
    }, 5000);
  }

 postRecipeWithInterval()

export default api;
