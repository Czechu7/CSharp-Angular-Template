export interface IUserAdmin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date | string | null;
  isActive: boolean;
}
