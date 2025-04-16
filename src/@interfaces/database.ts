export interface DatabaseWatchlist {
    id: number;
    user_id: string;
    movie_id: number;
}

export interface DatabaseUser {
    user_id: string;
    email: string;
    login: string;
    avatar_url?: string;
    total_movies?: number;
    total_serials?: number;
} 

export interface DatabaseRatings {
    id: number;
    movie_id: number;
    user_id: string;
    user_rating: number;
}