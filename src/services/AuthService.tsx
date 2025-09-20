import { AxiosResponse } from "axios";
import APIService from "./APIService.tsx";
import { User } from "./UserService.tsx";

class AuthService extends APIService {
  constructor() {
    super();
  }

  async loginUser(credentials: { email: string; password: string }): Promise<User> {
    const response: AxiosResponse<{ message: string; user: User }> = await this.post(
      "/auth/login",
      credentials
    );
    return response.data.user;
  }

  async registerUser(data: { name: string; email: string; password: string }): Promise<User> {
    const response: AxiosResponse<{ message: string; user: User }> = await this.post(
      "/users",
      data
    );
    return response.data.user;
  }
}

export default new AuthService();
