import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers.authorization);
    
    try {
      //this.jwtService.verify(token);
      const user = this.jwtService.verify(token);
      // Verificar si el usuario tiene el rol adecuado (por ejemplo, rol de administrador)
      if (user.role.id !== 1) {
        throw new UnauthorizedException('No tienes permiso para acceder a este recurso');
      }
      
      return true; // Permite el acceso si el usuario tiene el rol correcto
    } catch (err) {
      // Manejar errores de token JWT inválido o expirado
      throw new UnauthorizedException('Token JWT inválido o expirado');
    }
  }
  
  private extractTokenFromHeader(authHeader: string): string {
    if (!authHeader) {
      throw new UnauthorizedException('Token JWT no proporcionado');
    }
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Formato de encabezado de autorización inválido');
    }
    
    return parts[1];
  }
}
