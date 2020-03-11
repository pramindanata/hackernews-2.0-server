interface Params {
  [key: string]: string
}

export interface IndexQuery {
  search?: string
  sort: 'published' | 'vote'
  order: 'ASC' | 'DESC'
  limit: number
  skip: number
}

export interface GetOneParams extends Params {
  id: string
}

export interface UpdateParams extends Params {
  id: string
}

export interface DeleteParams extends Params {
  id: string
}

export interface StoreBody {
  url: string
  title: string
}

export interface UpdateBody {
  url: string
  title: string
}
