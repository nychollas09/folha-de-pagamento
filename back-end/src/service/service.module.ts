import { Module, Global } from '@nestjs/common';
import { ProfessorService } from './professor/professor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from 'src/domain/model/professor.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  providers: [ProfessorService],
  exports: [ProfessorService],
})
export class ServiceModule {}
