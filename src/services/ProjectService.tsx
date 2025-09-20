import { AxiosResponse } from "axios";
import APIService from "./APIService.tsx";

export interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

class ProjectService extends APIService {
  constructor() {
    super();
  }

  async getAllProjects(): Promise<Project[]> {
    const response: AxiosResponse<Project[]> = await this.get("/projects");
    return response.data;
  }

  async getProject(id: number): Promise<Project> {
    const response: AxiosResponse<Project> = await this.get(`/projects/${id}`);
    return response.data;
  }

  async createProject(project: { name: string; description: string }): Promise<Project> {
    const response: AxiosResponse<Project> = await this.post("/projects", project);
    return response.data;
  }

  async addUserToProject(projectId: number, userId: number, role: string = "Member"): Promise<any> {
    const response: AxiosResponse<any> = await this.post(`/projects/${projectId}/users`, {
      user_id: userId,
      role,
    });
    return response.data;
  }

  async removeUserFromProject(projectId: number, userId: number): Promise<void> {
    await this.delete(`/projects/${projectId}/users/${userId}`);
  }

  async deleteProject(id: number): Promise<void> {
    await this.delete(`/projects/${id}`);
  }

  async editProject(id: number, project: Partial<Project>): Promise<Project> {
    const response: AxiosResponse<Project> = await this.put(`/projects/${id}`, project);
    return response.data;
  }
}

export default new ProjectService();
