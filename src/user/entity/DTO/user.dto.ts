import { Role } from 'src/role/entity/role.entity';

export class UserDTO {
  username: string;
  nombre: string;
  role: Role;
  constructor(username: string, nombre: string, role: Role) {
    this.username = username;
    this.nombre = nombre;
    this.role = role;
  }
}


