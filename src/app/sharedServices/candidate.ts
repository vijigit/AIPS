import {JsonObject, JsonProperty} from "json2typescript";
import { Item } from "./candidatedetail";

@JsonObject("Candidate")
export class Candidate {

    @JsonProperty("Item", Item)
    Item: Item = undefined;
}
