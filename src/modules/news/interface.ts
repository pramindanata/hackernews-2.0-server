interface Params {
  [key: string]: string
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
