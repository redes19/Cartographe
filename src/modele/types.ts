export type TypeDeNode = "progression" | "pnj" | "monstre" | "batiment" | "lieu" | "objet"
export type TypeOfSheet = Exclude<TypeDeNode, "progression">
export type TypeOfLink = "suite" | "presence" | "relation"
export type TypeDeFlag = "info" | "relique" | "malediction"
export type StepRole = "depart" | "en cours" | "fin"
export type Progress = "brouillon" | "pret"

export interface Layer {
    id: string;
    name: string;
    order: number;
}

export interface Flag {
    id: string;
    name: string;
    type: TypeDeFlag;
}

export interface SheetStatus {
    sheet: string,
    status: string;
}

export interface NodeBase {
    id: string;
    title: string;
    description: string;
    gmNotes: string;
    progress: Progress;
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

export interface Link {
    id: string;
    type: TypeOfLink;
    from: string;
    to: string;
    libelle?: string;
    exigeFlag?: String[];
    exigeStatus?: SheetStatus[];
}

export interface IntendedAlerts {
    analyse: string;
    cible: string;
}

export interface Campaign {
    version: number;
    name: string;
    layers: Layer[];
    flags: Flag[];
    nodes: Node[];
    links: Link[];
    intendedAlerts: IntendedAlerts[];
}