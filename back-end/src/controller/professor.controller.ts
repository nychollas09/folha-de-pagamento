import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProfessorFilter } from 'src/domain/filter/professor.filter';
import { Page } from 'src/domain/interface/page';
import { Professor } from 'src/domain/model/professor.entity';
import { ProfessorService } from 'src/service/professor/professor.service';

@Controller({ path: 'professor' })
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get()
  public obterTodosOsProfessores(): Promise<Professor[]> {
    return this.professorService.obterTodosOsProfessores();
  }

  @Get('paged')
  public obterProfessoresPaginadoPorFiltro(
    @Query(new ValidationPipe({ transform: true }))
    professorFilter: ProfessorFilter,
  ): Promise<Page<Professor>> {
    return this.professorService.obterProfessoresPaginadoPorFiltro(
      professorFilter,
    );
  }

  @Get(':id')
  public obterProfessorPorId(@Param('id') id: number): Promise<Professor> {
    return this.professorService.obterProfessorPorId(id);
  }

  @Post()
  public obterContagem(@Body() professor: Professor): Promise<Professor> {
    return this.professorService.salvarProfessor(professor);
  }

  @Put(':id')
  public atualizarProfessor(@Body() professor: Professor): Promise<void> {
    return this.professorService.atualizarProfessor(professor);
  }

  @Delete(':id')
  public excluirProfessor(@Param('id') idProfessor: number): Promise<void> {
    return this.professorService.excluirProfessor(idProfessor);
  }
}
