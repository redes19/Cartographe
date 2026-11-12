export type TypeDeNode = "progression" | "pnj" | "monstre" | "batiment" | "lieu" | "objet"
export type TypeOfSheet = Exclude<TypeDeNode, "progression">
export type TypeDeLien = "suite" | "presence" | "relation"
export type TypeDeDrapeau = "info" | "relique" | "malediction"
export type StepRole = "depart" | "en cours" | "fin"
export type Avancement = "brouillon" | "pret"

export interface Layer {
    id: string;
    name: string;
    order: number;
}

export interface Drapeau {
    id: string;
    name: string;
    type: TypeDeDrapeau;
}

export interface SheetStatus {
    sheet: string,
    status: string;
}

export interface NodeBase {
    id: string;
    title: string;
    description: string;
    noteMj: string;
    avancement: Avancement;
}

export interface Step extends NodeBase {
    type: "progression";
    layer: string;
    role: StepRole;
    given: string[];
    changeStatus: SheetStatus[];
}

export interface Sheet extends NodeBase {
    type: TypeOfSheet;
    initialStatus: string;
    fields: Record<string, string>;
}

export type Node = Step | Sheet;

export interface Lien {
    id: string;
    type: TypeDeLien;
    depuis: string;
    vers: string;
    libelle?: string;
    exigeDrapeau?: String[];
    exigeStatus: SheetStatus[];
}

export interface AlerteVoulue {
    analyse: string;
    cible: string;
}

export interface Campaign {
    version: number;
    campaign: string;
    layers: Layer[];
    drapeaux: Drapeau[];
    nodes: Node[];
    liens: Lien[];
    alerteVoulues: AlerteVoulue[];
}