import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("TestDurations")
export class TestDuration {

    @JsonProperty("hour", Number)
    private _hour : number = undefined;
    get hour() { return this._hour; }
    set hour(value: number) { this._hour = value; }

    @JsonProperty("minute", Number)
    private _minute : number = undefined;
    get minute() { return this._minute; }
    set minute(value: number) { this._minute = value; }

    @JsonProperty("second", Number)
    private _second : number = undefined;
    get second() { return this._second; }
    set second(value: number) { this._second = value; }

}
