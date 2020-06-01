import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Desconto } from './desconto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Professor extends BaseEntity {
  @ApiProperty({
    description: 'Id do recurso professor',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Column({ length: 255, nullable: false })
  public nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Sobrenome é obrigatório' })
  @Column({ length: 255, nullable: false })
  public sobrenome: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Cpf é obrigatório' })
  @Column({ length: 11, unique: true, nullable: false })
  public cpf: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Salário é obrigatório' })
  @Column({ precision: 65, scale: 2, nullable: false })
  public salario: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Carteira assinada é obrigatório' })
  @Column({ name: 'carteira_assinada', nullable: false })
  public carteiraAssinada: boolean;

  @ApiProperty()
  @Column({ default: 'CURRENT_TIMESTAMP', nullable: false })
  public criado: Date;

  @ApiProperty()
  @Column({
    default: 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  public atualizado: Date;

  @OneToMany(
    () => Desconto,
    (desconto) => desconto.professorConnection,
  )
  descontoConnection: Promise<Desconto[]>;

  constructor(init?: Partial<Professor>) {
    super();
    Object.assign(this, init);
  }
}
