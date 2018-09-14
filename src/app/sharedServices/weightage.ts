import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Technologies")
export class Technologies {

    @JsonProperty("TechName", String)
    private _techname: string = undefined;
    get techname() { return this._techname; }
    set techname(value: string) { this._techname = value; }

    @JsonProperty("weightage", Number)
    private _weightage: number = undefined;
    get weightage() { return this._weightage; }
    set weightage(value: number) { this._weightage = value; }

    private _weightageList : Array<Number> = Array.from(new Array(10), (val, index) => index + 1)
    get weightageList() { return this._weightageList; }
    set weightageList(value:  Array<Number>) { this._weightageList = value; } 

    private _id : number = undefined;
    get id() { return this._id; }
    set id(value:  number) { this._id = value; }

    private _selected : boolean = undefined;
    get selected() { return this._selected; }
    set selected(value:  boolean) { this._selected = value; }
}
