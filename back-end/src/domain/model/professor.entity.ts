import {
  BaseEntity,
  Column,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Desconto } from './desconto.entity';

@Entity()
export class Professor extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255, nullable: false })
  public nome: string;

  @Column({ length: 255, nullable: false })
  public sobrenome: string;

  @Column({ length: 11, unique: true, nullable: false })
  public cpf: string;

  @Column({ precision: 65, scale: 2, nullable: false })
  public salario: number;

  @Column({ name: 'carteira_assinada', nullable: false })
  public carteiraAssinada: boolean;

  @Column({ default: 'CURRENT_TIMESTAMP', nullable: false })
  public criado: Date;

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
