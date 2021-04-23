import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTokenVersion1619189735938 implements MigrationInterface {
  name = "UserTokenVersion1619189735938";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "tokenVersion" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tokenVersion"`);
  }
}
