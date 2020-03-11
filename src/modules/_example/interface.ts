interface Params {
  [key: string]: string
}

export interface IndexQuery {
  search?: string
  sort: 'published' | 'vote'
  order: 'ASC' | 'DESC'
  limit: number
  offset: number
}

export interface ShowParams extends Params {
  id: string
}

export interface UpdateParams extends Params {
  id: string
}

export interface DeleteParams extends Params {
  id: string
}

export interface StoreBody {
  title: string
  description: string
}

export interface UpdateBody {
  title: string
  description: string
}
