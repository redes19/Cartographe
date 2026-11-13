import type { Layer } from "../../modele/types";


export function createLayer(id: string, name: string, order: number): Layer {
    return {
        id,
        name,
        order
    }
}