// Types (Models)
export type User = {
    id: number, 
    name: string,
    email: string
}

export type UserData = Omit<User, "id">;