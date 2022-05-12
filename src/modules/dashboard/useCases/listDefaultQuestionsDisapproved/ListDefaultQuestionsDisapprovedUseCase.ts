import { IDashboardRepository } from "@modules/dashboard/repositories/IDashboardRepository";
import { inject, injectable } from "tsyringe";
import { idDefaultQuestions } from "@shared/database/seed/createDefaultQuestions";

@injectable()
export class ListDefaultQuestionsDisapprovedUseCase {
  constructor(
    @inject("DashboardRepositoryInPrisma")
    private dashboardRepositoryInPrisma: IDashboardRepository,
  ) {}
  async execute() {
    const cavidade =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.cavidadeId,
      );
    const ciclo =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.cicloId,
      );
    const materiaPrima =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.materiaPrimaId,
      );
    const masters =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.mastersId,
      );
    const pesoMedioLiquido =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.pesoMedioLiquidoId,
      );
    const fichaInstrucaoDeTrabalho =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.fichaInstrucaoDeTrabalhoId,
      );
    const fichaTecnicaInjecao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.fichaTecnicaInjecaoId,
      );
    const planoInspecaoQualidade =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.planoInspecaoQualidadeId,
      );
    const planoAtencao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.planoAtencaoId,
      );
    const padraoHomologado =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.padraoHomologadoId,
      );
    const fluxoOperacao =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.fluxoOperacaoId,
      );
    const posticoDoMolde =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.posticoDoMoldeId,
      );
    const datadorMoldeAtualizado =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.datadorMoldeAtualizadoId,
      );
    const recursosMaoDeObra =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.recursosMaoDeObraId,
      );
    const embalagemConformeFit =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.embalagemConformeFitId,
      );
    const etiquetaEmbalagemDeAcordoProdutoCliente =
      await this.dashboardRepositoryInPrisma.listDefaultQuestionsDisapproved(
        idDefaultQuestions.etiquetaEmbalagemDeAcordoProdutoClienteId,
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
