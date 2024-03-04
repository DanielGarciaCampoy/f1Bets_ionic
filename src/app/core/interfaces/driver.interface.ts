export default interface Driver {
    id?: string;
    docId?: string;
    name: string;
    team: string;
    yearBirth: number;
    picture?:string;
    pictureFile?: any;
}