export class ProfessorFilter {
  public nome: string;
  public sobrenome: string;
  public cpf: string;
  public salario: string;
  public carteiraAssinada: boolean;
  public criado: Date;
  public atualizado: Date;

  constructor(init?: Partial<ProfessorFilter>) {
    Object.assign(this, init);
  }
}
