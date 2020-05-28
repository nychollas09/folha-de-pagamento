import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Types } from '../enum/typeorm-types-columns.enum';

export class criarProfessores1590671404376 implements MigrationInterface {
  private table = new Table({
    name: 'professor',
    columns: [
      {
        name: 'id',
        type: Types.BIGINT,
        length: '20',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'nome',
        type: Types.VARCHAR,
        length: '255',
        isNullable: false,
      },
      {
        name: 'sobrenome',
        type: Types.VARCHAR,
        length: '255',
        isNullable: false,
      },
      {
        name: 'cpf',
        type: Types.VARCHAR,
        length: '11',
        isNullable: false,
      },
      {
        name: 'salario',
        type: Types.DECIMAL,
        precision: 65,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'carteira_assinada',
        type: Types.BOOLEAN,
        isNullable: false,
      },
      {
        name: 'criado',
        type: Types.DATE,
        isNullable: false,
      },
      {
        name: 'atualizado',
        type: Types.DATE,
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
