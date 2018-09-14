import { TechnologyInterface } from "./technology-interface";

export class Technologies implements TechnologyInterface{
    id: number;    
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }


    
}
