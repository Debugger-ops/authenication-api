export interface User {
    id: string
    email: string
    name: string
  }
  
  export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface RegisterData extends LoginCredentials {
    name: string
  }