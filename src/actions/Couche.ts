import type { Couche } from "../modele/type";  

export function AddCouche(id: string, name: string, order: number): Couche | null {
    if(!id || !name || !order) return null;

    return {
        id: id,
        name: name,
        order: order
    }
}