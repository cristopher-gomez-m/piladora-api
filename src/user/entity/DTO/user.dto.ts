import { Role } from 'src/role/entity/role.entity';
import { User } from '../user.entity';

export class UserDTO {
  id:number;
  username: string;
  nombre: string;
  role: Role;
  constructor(user:User) {
    this.id = user.id;
    this.username = user.username;
    this.nombre = user.nombre;
    this.role = user.role;
  }
}


