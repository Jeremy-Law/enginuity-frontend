// src/services/ProjectService.tsx
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
    const response: AxiosResponse<Project[]> = await this.get("/projects/getAllProjects");
    return response.data;
  }

  async getProject(id: number): Promise<Project> {
    const response: AxiosResponse<Project> = await this.get(`/projects/getProject?id=${id}`);
    return response.data;
  }

  async createProject(project: { name: string; description: string }): Promise<Project> {
    const response: AxiosResponse<Project> = await this.post("/projects/createProject", project);
    return response.data;
  }

  async addUserToProject( projectId: string, users: string[] ): Promise<Project> {
    const response: AxiosResponse<Project> = await this.post("/projects/addUserToProject", {id: projectId, users, });
    return response.data;
  }


  async deleteProject(id: number): Promise<void> {
    await this.delete(`/projects/deleteProject?id=${id}`);
  }

  async editProject(id: number, project: Partial<Project>): Promise<Project> {
    const response: AxiosResponse<Project> = await this.put(`/projects/editProject?id=${id}`, project);
    return response.data;
  }
}

export default new ProjectService();
