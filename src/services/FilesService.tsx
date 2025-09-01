import APIService from "./APIService.tsx";

class FileService extends APIService {
  async getAllFileNames(): Promise<string[]> {
    const response = await this.get<{ files: string[] }>("/files");
    return response.data.files;
  }
}

export default new FileService();
