import {JsonObject, JsonProperty} from "json2typescript";
import { Item } from './criteriaItem'

@JsonObject("Criteria")
export class Criteria {

    @JsonProperty("Item", Item)
    Item: Item = undefined;
}
