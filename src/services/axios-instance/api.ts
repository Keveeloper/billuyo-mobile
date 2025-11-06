/**
 * Description:          Instancia de cliente HTTP, define el BASE_URL del endpoint backend y el 
 *                       header application/json que reciben todos los servicios del backend.
 * Created by:           Kevind Ospina
 * Created date:         Nov 06, 2025
 * Last modified by:     Kevind Ospina
 * Last modified date    Nov 06, 2025
 */
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, 
});

// ********** PENDIENTE DE IMPLEMENTAR INTERCEPTORES AQUÍ **********
// Usaremos interceptores más tarde para:
// 1. Adjuntar el JWT de NestJS a todas las peticiones salientes.
// 2. Manejar automáticamente los errores 401 (Unauthorized) cuando el token expire.


export default api;