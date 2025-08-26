import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskEntity1756017895735 implements MigrationInterface {
    name = 'CreateTaskEntity1756017895735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('DONE', 'OPEN', 'PENDING')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'OPEN', CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
    }

}
