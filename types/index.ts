export interface IItem {
  userId: number
  id: number
  title: string
  body: string
}

export interface IPagination {
  currentPage: number
  itemsPerPage: number
  totalPages: number
}