import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import type { LoginDto } from "./dto/login.dto";
import type { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	async register(dto: RegisterDto) {
		const exists = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});
		if (exists) throw new ConflictException("Email already in use");

		const hashed = await bcrypt.hash(dto.password, 12);
		const user = await this.prisma.user.create({
			data: { email: dto.email, password: hashed, name: dto.name },
		});

		return this.signToken(user.id, user.email, user.role);
	}

	async login(dto: LoginDto) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});
		if (!user) throw new UnauthorizedException("Invalid credentials");

		const valid = await bcrypt.compare(dto.password, user.password);
		if (!valid) throw new UnauthorizedException("Invalid credentials");

		return this.signToken(user.id, user.email, user.role);
	}

	private signToken(userId: string, email: string, role: string) {
		const payload = { sub: userId, email, role };
		const token = this.jwt.sign(payload);
		return { token, email, role };
	}
}
