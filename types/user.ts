export interface UserProfile {
    id: string
    email: string
    name: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface UserSettings {
    userId: string
    theme: 'light' | 'dark'
    notifications: boolean
  }