
export interface ChangePasswordDTO {
  current_password: string | null;
  password: string;
  confirm_password: string;
  refresh: string;
}
