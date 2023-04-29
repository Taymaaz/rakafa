export interface UserDTO {
    id: number;
    profile_name: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    home_phone: string;
    national_code: string;
    has_password: boolean;
    is_active: boolean;
    is_superuser: boolean;
}
