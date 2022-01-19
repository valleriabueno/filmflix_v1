export interface User {
  uid?: string; //id único
  email: string;
  username: string;
  birthdate: Date;
  profile: string; //link para a foto do usuário
}
