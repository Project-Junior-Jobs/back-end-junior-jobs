import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1678906540431 implements MigrationInterface {
    name = 'InitialMigration1678906540431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_companies" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "avatar" character varying(200), "site" character varying(200), "local" character varying(200) NOT NULL, "deletedAt" date, CONSTRAINT "UQ_dd96e435ff2576c997a5aede1cf" UNIQUE ("email"), CONSTRAINT "PK_73b8247d09e25f36310a1bd67d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_dev" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "avatar" character varying(200), "deletedAt" date, CONSTRAINT "UQ_0b2c4f0c29b43fc91b9a7174232" UNIQUE ("email"), CONSTRAINT "PK_4a5ee378581a69cb364a683ea56" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_dev"`);
        await queryRunner.query(`DROP TABLE "users_companies"`);
    }

}
