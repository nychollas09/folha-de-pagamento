import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'src/domain/model/professor.entity';
import { Repository } from 'typeorm';
import { ProfessorFilter } from 'src/domain/filter/professor.filter';
import { Page } from 'src/domain/interface/page';

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
  ): Promise<Page<Professor>> {
    const { page, size } = professorFilter;
    const [professores, countByFilter, countAllEntities] = await Promise.all([
      this.professorRepository.find({
        where: { nome: professorFilter.nome },
        skip: size * page,
        take: size,
      }),
      this.professorRepository.count({ where: { nome: professorFilter.nome } }),
      this.professorRepository.count(),
    ]);
    const totalPages = Math.ceil(countByFilter / size);
    return {
      content: professores,
      empty: professores.length < 1,
      first: Number(page) === 0,
      last: totalPages === Number(page),
      number: page,
      numberOfElements: professores ? professores.length : 0,
      size,
      totalElements: countAllEntities,
      totalPages,
    };
  }

  public async obterProfessorPorId(id: number): Promise<Professor> {
    const professorIdentificado = await this.professorRepository.findOne(id);
    if (!professorIdentificado) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Professor não encontrado para o id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return professorIdentificado;
  }

  public async salvarProfessor(professor: Professor): Promise<Professor> {
    const professorPorCpf = await this.professorRepository
      .find({
        where: {
          cpf: professor.cpf,
        },
        take: 1,
      })
      .then((professores) => professores[0]);
    if (professorPorCpf) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Professor já existente por cpf',
        },
        HttpStatus.CONFLICT,
      );
    }
    return this.professorRepository.save(professor);
  }

  public async atualizarProfessor(professor: Professor): Promise<void> {
    await this.obterProfessorPorId(professor.id);
    this.professorRepository.save(professor);
  }

  public async excluirProfessor(idProfessor: number): Promise<void> {
    await this.obterProfessorPorId(idProfessor);
    this.professorRepository.delete(idProfessor);
  }
}
