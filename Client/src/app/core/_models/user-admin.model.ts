import { IPagination } from './base-response.model';

export interface IUserAdmin {
  id: string;
  email?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  roles?: string;
  createdAt?: Date | string | null;
  isActive?: boolean;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface IUserAdminResponse {
  items: IUserAdmin[];
  pagination?: IPagination;
}
