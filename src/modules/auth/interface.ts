export interface RegisterBody {
  username: string
  email: string
  password: string
}

export interface LoginBody {
  username: string
  password: string
}

export interface UpdateBody {
  username: string
  email: string
  password?: string
}
