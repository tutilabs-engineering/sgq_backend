import { prismaAgent } from "../prismaAgent";

export const idDefaultQuestions = {
  cavidadeId: "59bd75e8-95dc-4df5-b2b2-899c0e02feb2",
  cicloId: "264405fc-f747-4b93-b4ee-a4f2e4c07e29",
  materiaPrimaId: "f6aeaca7-18e3-48df-96e5-610f80a5875c",
  mastersId: "7470e4c0-f852-4756-91dc-0d744444a10d",
  pesoMedioLiquidoId: "77a032a5-acf0-4d48-8364-35b4a2d70813",
  fichaInstrucaoDeTrabalhoId: "18bcb19a-9f75-491c-9c73-4f98770c0139",
  fichaTecnicaInjecaoId: "a6f61b88-554b-4ed6-9b6d-126f0a9827e3",
  planoInspecaoQualidadeId: "423a8330-4823-49d0-ad9e-a83686ba338d",
  planoAtencaoId: "eae4eb1e-75e6-4bf1-aeef-81438355f310",
  padraoHomologadoId: "9db538fb-8212-4ab6-92b5-7c310b36c6d5",
  fluxoOperacaoId: "01bf4a81-8f45-4cd3-b80e-5d950b930f78",
  posticoDoMoldeId: "9074f6a7-08ad-4bd7-a3d0-873f1655887e",
  datadorMoldeAtualizadoId: "411965f2-1fe5-4e2b-8513-8eb7050114ae",
  recursosMaoDeObraId: "50bf50a2-249b-4250-b88b-dc5f2b021029",
  embalagemConformeFitId: "1ac950e9-0dee-4e5f-939e-6731fce01612",
  etiquetaEmbalagemDeAcordoProdutoClienteId:
    "6c6687dd-6e36-4693-8a96-328163bbd559",
};

async function CreateDefaultQuestions(): Promise<void> {
  const verify = await prismaAgent.defaultQuestionIdentification.findFirst({
    where: { description: "Cavidade" },
  });

  if (!verify) {
    await prismaAgent.defaultQuestionIdentification.createMany({
      data: [
        { id: idDefaultQuestions.cavidadeId, description: "Cavidade" },
        { id: idDefaultQuestions.cicloId, description: "Ciclo" },
        {
          id: idDefaultQuestions.materiaPrimaId,
          description: "Matéria-prima",
        },
        { id: idDefaultQuestions.mastersId, description: "Masters" },
        {
          id: idDefaultQuestions.pesoMedioLiquidoId,
          description: "Peso médio liquido",
        },
        {
          id: idDefaultQuestions.fichaInstrucaoDeTrabalhoId,
          description: "Ficha de instrução de trabalho",
        },
        {
          id: idDefaultQuestions.fichaTecnicaInjecaoId,
          description: "Ficha técnica de injeção",
        },
        {
          id: idDefaultQuestions.planoInspecaoQualidadeId,
          description: "Plano de inspeção de qualidade",
        },
        {
          id: idDefaultQuestions.planoAtencaoId,
          description: "Plano de atenção",
        },
        {
          id: idDefaultQuestions.padraoHomologadoId,
          description: "Padrão homologado",
        },
        {
          id: idDefaultQuestions.fluxoOperacaoId,
          description: "Fluxo da operação",
        },
        {
          id: idDefaultQuestions.posticoDoMoldeId,
          description: "Postiço do molde",
        },
        {
          id: idDefaultQuestions.datadorMoldeAtualizadoId,
          description: "Datador do molde atualizado",
        },
        {
          id: idDefaultQuestions.recursosMaoDeObraId,
          description: "Recursos mão de obra",
        },
        {
          id: idDefaultQuestions.embalagemConformeFitId,
          description: "Embalagem conforme FIT",
        },
        {
          id: idDefaultQuestions.etiquetaEmbalagemDeAcordoProdutoClienteId,
          description: "Etiqueta da embalagem de acordo com o produto cliente",
        },
      ],
    });
    return console.log("Created default questions");
  }

  return console.log("Default questions already exists!");
}

export { CreateDefaultQuestions };
