import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrationLoaded1742910755786 implements MigrationInterface {
  name = 'NewMigrationLoaded1742910755786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`refresh_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`expiryDate\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`CreateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`theaters\` (\`id\` int NOT NULL AUTO_INCREMENT, \`CreateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`location\` varchar(255) NOT NULL, \`totalSeats\` int NOT NULL DEFAULT '0', \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`CreateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`producer\` varchar(255) NOT NULL, \`theaterId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reset_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`expiryDate\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_610102b60fea1455310ccd299de\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movies\` ADD CONSTRAINT \`FK_a0da9c1336ea0a80a6219c62405\` FOREIGN KEY (\`theaterId\`) REFERENCES \`theaters\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reset_tokens\` ADD CONSTRAINT \`FK_69015e2482e433b6d218ad0faf6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reset_tokens\` DROP FOREIGN KEY \`FK_69015e2482e433b6d218ad0faf6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movies\` DROP FOREIGN KEY \`FK_a0da9c1336ea0a80a6219c62405\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_610102b60fea1455310ccd299de\``,
    );
    await queryRunner.query(`DROP TABLE \`reset_tokens\``);
    await queryRunner.query(`DROP TABLE \`movies\``);
    await queryRunner.query(`DROP TABLE \`theaters\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
  }
}
