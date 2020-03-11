export interface IndexQuery {
  search?: string
  sort: 'username' | 'join'
  order: 'ASC' | 'DESC'
  limit: number
  skip: number
}

export interface ShowParams {
  id: number
}
