import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import * as AWS from "aws-sdk";
import * as DynamoDB from "aws-sdk/clients/dynamodb";
import {AuthorizationService} from "../authorization.service";


@Injectable()
export class DynamoDBService {

    constructor(private auth: AuthorizationService) {
        console.log("DynamoDBService: constructor");
    }

      

    writeLogEntry(email: string, secretCode: string) {
        try {
            let date = new Date().toString();
            console.log("DynamoDBService: Writing log entry. email:" + email ) ;
            this.write(email, secretCode, date);
        } catch (exc) {
            console.log("DynamoDBService: Couldn't write to DDB");
        }

    }

    write(email: string, secretCode: string, date: string): void {
        console.log("DynamoDBService: writing " + email + " entry");
        AWS.config.update({region:'us-east-2'});
        let clientParams:any = {
            params: {TableName: environment.ddbTableName}
        };
        
     
        var DDB =  new   AWS.DynamoDB.DocumentClient();

        // Write the item to the table
        var itemParams =
            {
                TableName: environment.ddbTableName,
                Item: {
                    Email: {S: email},
                    SecretCode: {S: secretCode},
                    Date: {S: date}
                }
            };
        DDB.put(itemParams, function (result) {
            console.log("DynamoDBService: wrote entry: " + JSON.stringify(result));
        });
    }

}


