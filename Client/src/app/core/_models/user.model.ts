export interface IUser {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export type IUserAdmin = IUser;


export interface IUserAdminResponse {
  items: IUserAdmin[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}


export interface IUSerUpdate {
  firstName?: string;
  lastName?: string;
}