export interface Components {
    id: number;
    name: string;
    parentID: number;
    parentName:string;
    extension:string;
    creationDate: Date;
    modificationDate:Date;
    icon:string;
    directChildComponents: Components[];
    content:string;
    ownerID:number;
}
