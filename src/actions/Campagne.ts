import type { Campagne } from "../modele/type";

export function InitializedCampagne(nameOfCampagne : string): Campagne {
    return {
        version: 1,
        campagne: nameOfCampagne,
        couches: [],
        drapeaux: [],
        nodes: [],
        liens: [],
        alerteVoulues: [],
    }
}