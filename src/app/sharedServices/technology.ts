import {JsonObject, JsonProperty} from "json2typescript";
import { Techitems } from "./Techitems";

@JsonObject("Technology")
export class Technology {

    @JsonProperty("Items", [Techitems])
    items: Techitems[] = undefined;
}
