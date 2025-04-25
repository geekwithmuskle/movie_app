import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1744397675632 implements MigrationInterface {
    name = 'NewMigration1744397675632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`actions\` \`action\` set ('read', 'create', 'update', 'delete') NOT NULL DEFAULT 'read,update'`);
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`CreateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`resource\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`actions\` set ('read', 'create', 'update', 'delete') NOT NULL DEFAULT 'read', \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_cdb4db95384a1cf7a837c4c683e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_cdb4db95384a1cf7a837c4c683e\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`action\` \`actions\` set ('read', 'create', 'update', 'delete') NOT NULL DEFAULT 'read,update'`);
    }

}
