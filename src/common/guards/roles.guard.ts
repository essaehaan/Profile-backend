import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user as { role?: Role } | undefined;
		if (!user || !user.role) {
			throw new ForbiddenException('Insufficient permissions');
		}
		const hasRole = requiredRoles.includes(user.role);
		if (!hasRole) {
			throw new ForbiddenException('Insufficient permissions');
		}
		return true;
	}
} 