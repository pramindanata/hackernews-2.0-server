export interface IndexQuery {
  search?: string
  sort: 'name' | 'join'
  order: 'ASC' | 'DESC'
  limit: number
  take: number
}

export interface GetOneParams {
  id: number
}
