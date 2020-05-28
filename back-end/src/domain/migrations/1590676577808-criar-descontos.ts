import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { Types } from '../enum/typeorm-types-columns.enum';

export class criarDescontos1590676577808 implements MigrationInterface {
  private table = new Table({
    name: 'desconto',
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
        name: 'descricao',
        type: Types.VARCHAR,
        length: '255',
        isNullable: false,
      },
      {
        name: 'valor',
        type: Types.DECIMAL,
        precision: 65,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'tipo_desconto',
        type: 'enum',
        enum: ['1', '2', '3', '4', '5', '6', '7', '8'],
        isNullable: false,
      },
      {
        name: 'id_professor',
        type: Types.BIGINT,
        isNullable: false,
      },
      {
        name: 'criado',
        type: Types.TIMESTAMP,
        default: 'CURRENT_TIMESTAMP',
        isNullable: false,
      },
      {
        name: 'atualizado',
        type: Types.TIMESTAMP,
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        isNullable: false,
      },
    ],
  });

  private foreignKeyProfessor = new TableForeignKey({
    columnNames: ['id_professor'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'professor',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey('desconto', this.foreignKeyProfessor);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
