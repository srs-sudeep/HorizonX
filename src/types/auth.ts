export enum UserRole {
	ADMIN = "admin",
	MANAGER = "manager",
	USER = "user",
}

export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	avatar?: string;
}

export interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}
