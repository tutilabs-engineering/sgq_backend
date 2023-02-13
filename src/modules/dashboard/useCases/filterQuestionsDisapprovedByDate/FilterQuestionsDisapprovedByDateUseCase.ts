import { IDashboardRepository } from "@modules/dashboard/repositories/IDashboardRepository";
import { inject, injectable } from "tsyringe";
import { idDefaultQuestions } from "@shared/database/seed/createDefaultQuestions";

interface IRequest {
  date_start: Date;
  date_end: Date;
  workShift: number;
}

@injectable()
export class FilterQuestionsDisapprovedByDateUseCase {
  constructor(
    @inject("DashboardRepositoryInPrisma")
    private dashboardRepositoryInPrisma: IDashboardRepository,
  ) {}
  async execute({ date_start, date_end, workShift }: IRequest) {
    let hourEnd = "";
    let hourStart = "";

    switch (workShift) {
      case 1:
        hourStart = "06:00:00";
        hourEnd = "13:59:00";
        break;

      case 2:
        hourStart = "14:00:00";
        hourEnd = "21:59:00";
        break;

      case 3:
        hourStart = "22:00:00";
        hourEnd = "05:59:00";
        break;

      default:
        hourStart = "00:00:00";
        hourEnd = "24:00:00";
        break;
    }
    const cavidade =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.cavidadeId,
          hourEnd,
          hourStart,
        },
      );
    const ciclo =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.cicloId,
          hourEnd,
          hourStart,
        },
      );
    const materiaPrima =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.materiaPrimaId,
          hourEnd,
          hourStart,
        },
      );
    const masters =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.mastersId,
          hourEnd,
          hourStart,
        },
      );
    const pesoMedioLiquido =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.pesoMedioLiquidoId,
          hourEnd,
          hourStart,
        },
      );
    const fichaInstrucaoDeTrabalho =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.fichaInstrucaoDeTrabalhoId,
          hourEnd,
          hourStart,
        },
      );
    const fichaTecnicaInjecao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.fichaTecnicaInjecaoId,
          hourEnd,
          hourStart,
        },
      );
    const planoInspecaoQualidade =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.planoInspecaoQualidadeId,
          hourEnd,
          hourStart,
        },
      );
    const planoAtencao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.planoAtencaoId,
          hourEnd,
          hourStart,
        },
      );
    const padraoHomologado =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.padraoHomologadoId,
          hourEnd,
          hourStart,
        },
      );
    const fluxoOperacao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.fluxoOperacaoId,
          hourEnd,
          hourStart,
        },
      );
    const posticoDoMolde =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.posticoDoMoldeId,
          hourEnd,
          hourStart,
        },
      );
    const datadorMoldeAtualizado =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.datadorMoldeAtualizadoId,
          hourEnd,
          hourStart,
        },
      );
    const recursosMaoDeObra =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.recursosMaoDeObraId,
          hourEnd,
          hourStart,
        },
      );
    const embalagemConformeFit =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question: idDefaultQuestions.embalagemConformeFitId,
          hourEnd,
          hourStart,
        },
      );
    const etiquetaEmbalagemDeAcordoProdutoCliente =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapprovedByDate(
        {
          date_end,
          date_start,
          id_default_question:
            idDefaultQuestions.etiquetaEmbalagemDeAcordoProdutoClienteId,
          hourEnd,
          hourStart,
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
