export interface IndexQuery {
  search?: string
  sort: 'username' | 'join'
  order: 'ASC' | 'DESC'
  limit: number
  offset: number
}

export interface ShowParams {
  id: string
  [key: string]: string
}
