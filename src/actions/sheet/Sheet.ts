import type { NodeBase, Sheet, TypeOfSheet } from "../../modele/types";
import { definitionsDesTypes } from '../../modele/definitionsDesTypes';


export function createSheet(nodeBase: NodeBase, type: TypeOfSheet): Sheet {
    const definition = definitionsDesTypes[type];

    const initialStatus = definition.statuts[0]

    const emptyFields = Object.fromEntries(
        definition.fields.map((fieldName) => [fieldName, ""])
    )

    return {
        ...nodeBase,
        type,
        initialStatus,
        fields: emptyFields
    }
}