export interface UseDatoCmsParams {
    query: any;
    variables?: Record<string, any>;
    subscribe?: boolean | 'preview';
}
export interface DatoCmsState {
    preview: boolean;
    token: string;
}
interface StructuredTextRoot {
    type: 'root';
    children: Array<StructuredTextNode>;
}
interface StructuredTextBranch {
    type: string;
    children: Array<StructuredTextNode>;
}
interface StructuredTextLeaf {
    type: string;
    [key: string]: any;
}
type StructuredTextNode = StructuredTextBranch | StructuredTextLeaf;
export interface StructuredText {
    value: {
        schema: string;
        document: StructuredTextRoot;
    };
}
export {};
