export interface IUserAdmin {
  id: string;
  email?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  roles?: string;
  createdAt?: Date | string | null;
  isActive?: boolean;
}

export interface IUserAdminResponse {
  items: IUserAdmin[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
