import { JsonObject, JsonProperty } from "json2typescript";
import { Technologies } from "./weightage";


@JsonObject("Item")
export class Item {

    @JsonProperty("SecretCode", String)
    private _secretcode: string = undefined;
    get secretcode() { return this._secretcode; }
    set secretcode(value: string) { this._secretcode = value; }

    @JsonProperty("CandidateName", String)
    private _candidateName: string = undefined;
    get candidateName() { return this._candidateName; }
    set candidateName(value: string) { this._candidateName = value; }

    @JsonProperty("Technologies", [Technologies])
    Technologies: Technologies[] = undefined;

    


}
