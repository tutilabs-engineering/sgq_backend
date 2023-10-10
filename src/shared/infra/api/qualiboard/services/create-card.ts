import { httpQualiboard } from "../qualiboard_config"

export interface CreateRepproval {
    description: string
    status: number
    comment?: string
    imagePath?: string
}
export interface CreateCard {
    startupId: string
    status: number
    repproval?: CreateRepproval[]
    machine: { code: string }
    product: { code: string }
}

export async function createCard(data: CreateCard){
        await httpQualiboard.post("/card", data).catch((e) => {
            console.log("Erro ao criar card no qualiboard: ", e);

        })
}