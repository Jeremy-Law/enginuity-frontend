import APIService from "./APIService.tsx";

class FileService extends APIService {
  // -------- FILES --------

  async uploadFile(key: string, content: string): Promise<any> {
    const response = await this.post("/files", { key, content });
    return response.data;
  }

  async getAllFileNames(): Promise<string[]> {
    const response = await this.get<any>("/files");
    return response.data;
  }

  async getFile(key: string): Promise<Blob> {
    const response = await this.get<any>(`/files/${key}`, { responseType: "blob" });
    return response.data;
  }

  async deleteFile(key: string): Promise<any> {
    const response = await this.delete(`/files/${key}`);
    return response.data;
  }

  async replaceFile(key: string, newContent: string): Promise<any> {
    const response = await this.put(`/files/${key}`, { newContent });
    return response.data;
  }

  async searchFiles(prefix: string): Promise<string[]> {
    const response = await this.get<any>(`/files/search?prefix=${prefix}`);
    return response.data;
  }

  async getRecentFiles(): Promise<any[]> {
    const response = await this.get<any>("/files/recent");
    return response.data;
  }

  // -------- COMMENTS --------

  async addComment(key: string, comment: string): Promise<any> {
    const response = await this.post(`/files/${key}/comments`, { comment });
    return response.data;
  }

  async editComment(key: string, commentId: string, newComment: string): Promise<any> {
    const response = await this.put(`/files/${key}/comments/${commentId}`, { newComment });
    return response.data;
  }

  async deleteComment(key: string, commentId: string): Promise<any> {
    const response = await this.delete(`/files/${key}/comments/${commentId}`);
    return response.data;
  }

  // -------- QUESTIONS --------

  async addQuestion(key: string, question: string): Promise<any> {
    const response = await this.post(`/files/${key}/questions`, { question });
    return response.data;
  }

  async editQuestion(key: string, questionId: string, newContent: string): Promise<any> {
    const response = await this.put(`/files/${key}/questions/${questionId}`, { newContent });
    return response.data;
  }

  async deleteQuestion(key: string, questionId: string): Promise<any> {
    const response = await this.delete(`/files/${key}/questions/${questionId}`);
    return response.data;
  }

  async answerQuestion(key: string, questionId: string, answer: string): Promise<any> {
    const response = await this.post(`/files/${key}/questions/${questionId}/answer`, { answer });
    return response.data;
  }
}

export default new FileService();
