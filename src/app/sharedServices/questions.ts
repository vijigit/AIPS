import {JsonObject, JsonProperty} from "json2typescript";
import { Item } from "./item";

@JsonObject("Questions")
export class Questions {

    @JsonProperty("Items", [Item])
    items: Item[] = undefined;


    
}
