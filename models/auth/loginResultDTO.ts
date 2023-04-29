export interface LoginResultDTO {
    access: string;
    refresh: string;
}

export interface AuthResultDTO {
    section: string;

}

export interface ResetResultDTO {
    section: string;
    done: boolean;

}
