import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';

@Module({
  controllers: [ProfessorController],
})
export class ControllerModule {}
