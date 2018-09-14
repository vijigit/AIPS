import { JsonObject, JsonProperty } from "json2typescript";
import { CandidateQuesItemJson } from './candidateQuesItem'

@JsonObject("CandidateQuestion")
export class CandidateQuesJson {

    @JsonProperty("Items", [CandidateQuesItemJson] )
    questions : CandidateQuesItemJson[] = undefined;
}
