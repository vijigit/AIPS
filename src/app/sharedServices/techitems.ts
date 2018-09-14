import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Item")
export class Techitems {

    @JsonProperty("Technology_name", String)
    private _techname: string = undefined;
    get techname() { return this._techname; }
    set techname(value: string) { this._techname = value; }

}
