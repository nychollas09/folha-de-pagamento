import { Controller, Get } from '@nestjs/common';
import { Professor } from 'src/domain/model/professor.entity';
import { Observable, of } from 'rxjs';

@Controller({ path: 'professor' })
export class ProfessorController {
  @Get()
  public obterTodosOsProfessores(): Observable<Professor[]> {
    return of([
      new Professor({
        nome: 'Nichollas',
        sobrenome: 'Falcão dos Santos',
        cpf: '08271013335',
        salario: 9999,
        carteiraAssinada: true,
      }),
    ]);
  }
}
