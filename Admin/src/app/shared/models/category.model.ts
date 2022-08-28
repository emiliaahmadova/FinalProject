export interface ICategory {
  id: number;
  name: string;
  filePath: string;
  departmentId: number;
  department?: any;
  order: number;
}
