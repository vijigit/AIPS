import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Item")
export class Item {

    @JsonProperty("Question", String)
    private _question: string = undefined;
    get question() { return this._question; }
    set question(value: string) { this._question = value; }

    @JsonProperty("Option1", String)
    private _option1: string = undefined;
    get option1() { return this._option1; }
    set option1(value: string) { this._option1 = value; }

    @JsonProperty("Option2", String)
    private _option2: string = undefined;
    get option2() { return this._option2; }
    set option2(value: string) { this._option2 = value; }
    
    @JsonProperty("Option3", String)
    private _option3: string = undefined;
    get option3() { return this._option3; }
    set option3(value: string) { this._option3 = value; }

    @JsonProperty("Option4", String)
    private _option4: string = undefined;
    get option4() { return this._option4; }
    set option4(value: string) { this._option4 = value; }

    


}
