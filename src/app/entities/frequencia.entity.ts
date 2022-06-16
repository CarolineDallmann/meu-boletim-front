import { Pessoa } from './pessoa.entity';

export type FrequenciaAlunoPayload = {
  id: string;
  presenca: boolean;
  frequenciaId?: string;
};

export type FrequenciaPayload = {
  alunos: FrequenciaAlunoPayload[];
  materiaId: string;
  dataPresenca: string;
};

export type FrequenciaResponse = {
  id: string;
  aluno: Pessoa;
  presenca?: boolean;
};
