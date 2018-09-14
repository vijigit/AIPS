import { JsonObject, JsonProperty } from "json2typescript";
import { Questions } from "./questions";

@JsonObject("CandidateQuestion")
export class CandidateQuesItemJson {

    @JsonProperty("Questions", String)
    questionItems: string = undefined;
}
