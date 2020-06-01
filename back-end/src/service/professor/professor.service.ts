import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'src/domain/model/professor.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { ProfessorFilter } from 'src/domain/filter/professor-filter';
import { Page } from 'src/domain/interface/page';
import { PageUtil } from 'src/shared/util/page.util';
import { QueryUtil } from 'src/shared/util/query.util';
import { Pageable } from 'src/domain/interface/pageable';
import { HttpExceptionResponse } from 'src/domain/interface/http-exception-response';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    public readonly professorRepository: Repository<Professor>,
  ) {}

  public obterTodosOsProfessores(): Promise<Professor[]> {
    return this.professorRepository.find();
  }

  public async obterProfessoresPaginadoPorFiltro(
    professorFilter: ProfessorFilter,
    pageable: Pageable,
  ): Promise<Page<Professor>> {
    console.log(professorFilter, pageable);
    const { page, size } = pageable;
    const options: FindManyOptions<Professor> = QueryUtil.createWhereConditionFromFilter<
      Professor
    >(professorFilter, ['nome', 'sobrenome']);
    return PageUtil.pageByCount<Professor>(
      { page, size },
      this.professorRepository,
      options,
      Professor,
    );
  }

  public async obterProfessorPorId(id: number): Promise<Professor> {
    const professorIdentificado = await this.professorRepository.findOne(id);
    if (!professorIdentificado) {
      throw new HttpException(
        {
          message: 'Professor não encontrado para o id informado.',
          error: 'Not found',
          statusCode: HttpStatus.NOT_FOUND,
        } as HttpExceptionResponse,
        HttpStatus.NOT_FOUND,
      );
    }
    return professorIdentificado;
  }

  public async salvarProfessor(professor: Professor): Promise<Professor> {
    const professorPorCpf = await this.obterProfessorPorCpf(professor.cpf);
    if (professorPorCpf) {
      throw new HttpException(
        {
          message: 'Professor já existente por cpf.',
          error: 'Conflict',
          statusCode: HttpStatus.CONFLICT,
        } as HttpExceptionResponse,
        HttpStatus.CONFLICT,
      );
    }
    return this.professorRepository.save(professor);
  }

  public async atualizarProfessor(
    idProfessor: number,
    professor: Professor,
  ): Promise<void> {
    professor.id = idProfessor;
    await this.obterProfessorPorId(professor.id);
    this.professorRepository.save(professor);
  }

  public async excluirProfessor(idProfessor: number): Promise<void> {
    await this.obterProfessorPorId(idProfessor);
    this.professorRepository.delete(idProfessor);
  }

  private async obterProfessorPorCpf(cpf: string): Promise<Professor> {
    const professorPorCpf = await this.professorRepository
      .find({
        where: {
          cpf,
        },
        take: 1,
      })
      .then((professores) => professores[0]);
    return professorPorCpf;
  }
}
