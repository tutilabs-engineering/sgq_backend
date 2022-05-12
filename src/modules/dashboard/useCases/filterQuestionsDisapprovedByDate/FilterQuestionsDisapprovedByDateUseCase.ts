import { IDashboardRepository } from "@modules/dashboard/repositories/IDashboardRepository";
import { inject, injectable } from "tsyringe";
import { idDefaultQuestions } from "@shared/database/seed/createDefaultQuestions";

interface IRequest {
  date_start: Date;
  date_end: Date;
}

@injectable()
export class FilterQuestionsDisapprovedByDateUseCase {
  constructor(
    @inject("DashboardRepositoryInPrisma")
    private dashboardRepositoryInPrisma: IDashboardRepository,
  ) {}
  async execute({ date_start, date_end }: IRequest) {
    const cavidade =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.cavidadeId,
        },
      );
    const ciclo =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.cicloId,
        },
      );
    const materiaPrima =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.materiaPrimaId,
        },
      );
    const masters =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.mastersId,
        },
      );
    const pesoMedioLiquido =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.pesoMedioLiquidoId,
        },
      );
    const fichaInstrucaoDeTrabalho =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.fichaInstrucaoDeTrabalhoId,
        },
      );
    const fichaTecnicaInjecao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.fichaTecnicaInjecaoId,
        },
      );
    const planoInspecaoQualidade =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.planoInspecaoQualidadeId,
        },
      );
    const planoAtencao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.planoAtencaoId,
        },
      );
    const padraoHomologado =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.padraoHomologadoId,
        },
      );
    const fluxoOperacao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.fluxoOperacaoId,
        },
      );
    const posticoDoMolde =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.posticoDoMoldeId,
        },
      );
    const datadorMoldeAtualizado =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.datadorMoldeAtualizadoId,
        },
      );
    const recursosMaoDeObra =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.recursosMaoDeObraId,
        },
      );
    const embalagemConformeFit =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.embalagemConformeFitId,
        },
      );
    const etiquetaEmbalagemDeAcordoProdutoCliente =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question:
            idDefaultQuestions.etiquetaEmbalagemDeAcordoProdutoClienteId,
        },
      );

    const listQuantityOfDefaultQuestionsDisapproved = {
      cavidade: cavidade.length,
      ciclo: ciclo.length,
      materiaPrima: materiaPrima.length,
      masters: masters.length,
      pesoMedioLiquido: pesoMedioLiquido.length,
      fichaInstrucaoDeTrabalho: fichaInstrucaoDeTrabalho.length,
      fichaTecnicaInjecao: fichaTecnicaInjecao.length,
      planoInspecaoQualidade: planoInspecaoQualidade.length,
      planoAtencao: planoAtencao.length,
      padraoHomologado: padraoHomologado.length,
      fluxoOperacao: fluxoOperacao.length,
      posticoDoMolde: posticoDoMolde.length,
      datadorMoldeAtualizado: datadorMoldeAtualizado.length,
      recursosMaoDeObra: recursosMaoDeObra.length,
      embalagemConformeFit: embalagemConformeFit.length,
      etiquetaEmbalagemDeAcordoProdutoCliente:
        etiquetaEmbalagemDeAcordoProdutoCliente.length,
    };

    return listQuantityOfDefaultQuestionsDisapproved;
  }
}
