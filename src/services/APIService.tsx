import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_SERVER_API } from "../common/config";

class APIService {
  // Axios instance configured with base URL and headers
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_SERVER_API, // Base API endpoint (from config file)
      headers: {
        "Content-Type": "application/json", // Default header for JSON APIs
      },
    });

    /** 
     * Request Interceptor
     * Runs before each request is sent.
     * Common use case: attach authentication tokens or custom headers.
     */
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken"); // example: JWT token stored locally
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    /**
     * Response Interceptor
     * Runs after each response is received.
     * Common use case: global error handling or response transformations.
     */
    this.client.interceptors.response.use(
      (response) => response, // Pass through successful responses
      (error) => {
        console.error("API Error:", error); // Log errors globally
        return Promise.reject(error); // Forward error to caller
      }
    );
  }

  /**
   * Helper to build a full URL by appending an endpoint to the base URL
   * @param endpoint API path (e.g., "users", "orders/123")
   * @returns Full URL string
   */
  protected buildURL(endpoint: string): string {
    return `${this.client.defaults.baseURL}/${endpoint}`;
  }

  /**
   * Perform a GET request
   * @param url endpoint path (will be combined with baseURL)
   * @param config optional axios config (headers, params, etc.)
   */
  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  /**
   * Perform a POST request
   * @param url endpoint path
   * @param data request body payload
   * @param config optional axios config
   */
  protected post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  /**
   * Perform a PUT request
   * @param url endpoint path
   * @param data request body payload
   * @param config optional axios config
   */
  protected put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  /**
   * Perform a DELETE request
   * @param url endpoint path
   * @param config optional axios config
   */
  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

export default APIService;
