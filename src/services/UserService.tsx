import { AxiosResponse } from "axios";
import APIService from "./APIService.tsx";

export interface User {
  id: number;
  name: string;
  email: string;
}

class UserService extends APIService {
  constructor() {
    super();
  }

  async getUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await this.get("/users");
    return response.data;
  }

  async getUserById(id: number): Promise<User> {
    const response: AxiosResponse<User> = await this.get(`/users/${id}`);
    return response.data;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.put(`/users/${id}`, user);
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(`/users/${id}`);
  }
}

export default new UserService();
