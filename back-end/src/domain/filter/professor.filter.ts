import { BaseFilter } from './base-filter';

export class ProfessorFilter extends BaseFilter {
  public nome: string;
  public sobrenome: string;
  public cpf: string;
  public salario: string;
  public carteiraAssinada: boolean;
  public criado: Date;
  public atualizado: Date;

  constructor(init?: Partial<ProfessorFilter>) {
    super();
    Object.assign(this, init);
    if (init) {
      if (init.criado) {
        this.criado = new Date(init.criado);
      }
      if (init.atualizado) {
        this.atualizado = new Date(init.atualizado);
      }
    }
  }
}
