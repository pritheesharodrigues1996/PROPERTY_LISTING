export interface Project {
  id: string;
  name: string;
}

export interface PropertyFormData {
  projectId: string;
  title: string;
  size: number;
  price: number;
  handoverDate: Date | null;
}