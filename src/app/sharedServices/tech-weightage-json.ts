import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Technology")
export class TechWeightageJson {

    @JsonProperty("weightage", Number)
    private _weightage : number = undefined;
    get weightage() { return this._weightage; }
    set weightage(value: number) { this._weightage = value; }

    @JsonProperty("TechName", String)
    private _techName : string = undefined;
    get techName() { return this._techName; }
    set techName(value: string) { this._techName = value; }

}
