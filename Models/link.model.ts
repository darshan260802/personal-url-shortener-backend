// Create Link body Model
export interface BodyCreateLink{
    long_url: string;
}

// STORED LINKS IN JSON
export interface ShortendLink{
    long_url:string;
    short_url: string;
    created_at: number;
}