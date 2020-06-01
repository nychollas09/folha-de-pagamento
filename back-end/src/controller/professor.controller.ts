import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  HttpCode,
  ValidationPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ProfessorFilter } from 'src/domain/filter/professor-filter';
import { Page } from 'src/domain/interface/page';
import { Pageable } from 'src/domain/interface/pageable';
import { Professor } from 'src/domain/model/professor.entity';
import { FilterPipe } from 'src/shared/pipe/filter.pipe';
import { ProfessorService } from 'src/service/professor/professor.service';

@Controller({ path: 'professor' })
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get()
  public obterTodosOsProfessoresPorFiltro(
    @Query(new FilterPipe(ProfessorFilter)) professorFilter: ProfessorFilter,
  ): Promise<Professor[]> {
    return this.professorService.obterTodosOsProfessores();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('paged')
  public obterProfessoresPaginadoPorFiltro(
    @Query(
      'size',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    size: number,
    @Query(
      'page',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    page: number,
    @Query(new FilterPipe(ProfessorFilter)) professorFilter: ProfessorFilter,
  ): Promise<Page<Professor>> {
    return this.professorService.obterProfessoresPaginadoPorFiltro(
      professorFilter,
      { page, size } as Pageable,
    );
  }

  @Get(':id')
  public obterProfessorPorId(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Professor> {
    return this.professorService.obterProfessorPorId(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public obterContagem(
    @Body(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
        transform: true,
      }),
    )
    professor: Professor,
  ): Promise<Professor> {
    return this.professorService.salvarProfessor(new Professor(professor));
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public atualizarProfessor(
    @Param('id') idProfessor: number,
    @Body() professor: Professor,
  ): Promise<void> {
    return this.professorService.atualizarProfessor(idProfessor, professor);
  }

  @Delete(':id')
  public excluirProfessor(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    idProfessor: number,
  ): Promise<void> {
    return this.professorService.excluirProfessor(idProfessor);
  }
}
