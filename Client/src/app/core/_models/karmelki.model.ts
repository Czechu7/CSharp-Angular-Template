export interface IKarmelki {
  id?: string;
  name: string;
  count: number;
  price: number;
  isZiemniak: boolean;
  arrivalDate: Date;
}

export interface IKarmelkiResponse {
  items: IKarmelki[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
