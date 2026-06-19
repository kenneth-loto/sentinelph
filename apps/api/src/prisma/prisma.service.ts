import {
	Injectable,
	type OnModuleDestroy,
	type OnModuleInit,
} from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
	private client: PrismaClient;

	constructor() {
		const adapter = new PrismaPg({
			connectionString: process.env.DATABASE_URL,
		});
		this.client = new PrismaClient({ adapter });
	}

	get user() {
		return this.client.user;
	}
	get earthquake() {
		return this.client.earthquake;
	}
	get typhoonEvent() {
		return this.client.typhoonEvent;
	}
	get disasterAlert() {
		return this.client.disasterAlert;
	}

	async onModuleInit() {
		await this.client.$connect();
	}

	async onModuleDestroy() {
		await this.client.$disconnect();
	}
}
