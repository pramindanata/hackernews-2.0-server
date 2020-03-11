export interface IndexQuery {
  search?: string
  sort: 'published' | 'vote'
  order: 'ASC' | 'DESC'
  limit: number
  offset: number
}

export interface IndexParams {
  userId: string
  [key: string]: string
}
