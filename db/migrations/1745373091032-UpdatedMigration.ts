import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedMigration1745373091032 implements MigrationInterface {
    name = 'UpdatedMigration1745373091032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`resource\` \`resource\` enum ('admin', 'user') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`actions\` \`actions\` set ('read', 'create', 'update', 'delete') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`resource\` \`resource\` enum ('admin', 'user') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`action\` \`action\` set ('read', 'create', 'update', 'delete') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`action\` \`action\` set ('read', 'create', 'update', 'delete') NOT NULL DEFAULT 'read,update'`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`resource\` \`resource\` enum ('admin', 'user') NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`actions\` \`actions\` set ('read', 'create', 'update', 'delete') NOT NULL DEFAULT 'read'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`resource\` \`resource\` enum ('admin', 'user') NOT NULL DEFAULT 'user'`);
    }

}
