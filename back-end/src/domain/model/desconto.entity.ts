import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoDesconto } from '../enum/tipo-desconto.enum';
import { Professor } from './professor.entity';

@Entity()
export class Desconto extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255, nullable: false })
  public descricao: string;

  @Column({ precision: 65, scale: 2, nullable: false })
  public valor: number;

  @Column({ type: 'enum', name: 'tipo_desconto', enum: TipoDesconto })
  public tipoDesconto: TipoDesconto;

  @Column({ default: new Date(), nullable: false })
  public criado: Date;

  @Column({ default: new Date(), nullable: false })
  public atualizado: Date;

  @Column({ name: 'id_professor' })
  public professorId: number;

  public professor: Professor;

  @ManyToOne(
    () => Professor,
    (professor) => professor.descontoConnection,
    { primary: true, nullable: false },
  )
  @JoinColumn({ name: 'idProfessor' })
  public professorConnection: Promise<Professor>;

  constructor(init?: Partial<Desconto>) {
    super();
    Object.assign(this, init);
  }
}
