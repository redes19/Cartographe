import type { Layer } from "../modele/type";


export function createLayer(id: string, name: string, order: number): Layer {
    return {
        id,
        name,
        order
    }
}