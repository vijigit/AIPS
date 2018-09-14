import { JsonObject, JsonProperty } from "json2typescript";
import { TechWeightageJson } from './tech-weightage-json';
import { TestDuration} from './test-duration';

@JsonObject("CriteriaItem")
export class Item {   

    @JsonProperty("Technologies", [TechWeightageJson])
    technologiesWeightage: TechWeightageJson[] = [];

    @JsonProperty("TestDuration", TestDuration)
    private _testDuration: TestDuration = undefined;
    get testDuration() { return this._testDuration; }
    set testDuration(value: TestDuration) { this._testDuration = value; }

    @JsonProperty("CandidateName", String)
    CandidateName : string = undefined;
}
