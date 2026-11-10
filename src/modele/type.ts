export type TypeDeNode = "progression" | "pnj" | "monstre" | "batiment" | "lieu" | "objet"
export type TypeDeFiche = Exclude<TypeDeNode, "progression">
export type TypeDeLien = "suite" | "presence" | "relation"
export type TypeDeDrapeau = "info" | "relique" | "malediction"
export type RoleEtape = "depart" | "en cours" | "fin"
export type Avancement = "brouillon" | "pret"

export interface Couche {
    id: string;
    name: string;
    order: number;
}

export interface Drapeau {
    id: string;
    name: string;
    type: TypeDeDrapeau;
}

export interface EtatFiche {
    fiche: string,
    status: string;
}

export interface BaseDeNode {
    id: string;
    titre: string;
    description: string;
    noteMj: string;
    avancement: Avancement;
}

export interface Etape extends BaseDeNode {
    type: "progression";
    couche: string;
    role: RoleEtape;
    given: string[];
    changeStatus: EtatFiche[];
}

export interface Fiche extends BaseDeNode {
    type: TypeDeFiche;
    statusInitial: string;
    champs: Record<string, string>;
}

export type Node = Etape | Fiche;

export interface Lien {
    id: string;
    type: TypeDeLien;
    depuis: string;
    vers: string;
    libelle?: string;
    exigeDrapeau?: String[];
    exigeStatus: EtatFiche[];
}

export interface AlerteVoulue {
    analyse: string;
    cible: string;
}

export interface Campagne {
    version: number;
    campagne: string;
    couches: Couche[];
    drapeaux: Drapeau[];
    nodes: Node[];
    liens: Lien[];
    alerteVoulues: AlerteVoulue[];
}