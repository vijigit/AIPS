import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import * as AWS from "aws-sdk";
import * as DynamoDB from "aws-sdk/clients/dynamodb";
import { AuthorizationService } from "../authorization.service";
import { CandidateServiceModule } from '../candidate-service/candidate-service.module';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UUID } from 'angular2-uuid';
import { Item } from "../item";

@Injectable()
export class DynamoDBService {

    constructor(private auth: AuthorizationService, private candidateService: CandidateServiceModule) {

    }



    writeLogEntry(email: string, secretCode: string, name: string) {
        try {
            let date = new Date().toString();
            this.writeToCandidateLoginTbl(email, secretCode, date, name);
           
        } catch (exc) {
            console.log("DynamoDBService: Couldn't write to DDB");
        }

    }

    writeToCandidateLoginTbl(email: string, secretCode: string, date: string, name: string): void {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var itemParams =
        {
            TableName: environment.ddb_CandidateLoginDetail_Tbl,
            Item: {
                Email: email,
                SecretCode: secretCode,
                Date: date,
                CandidateName: name
            }
        };

        DDB.put(itemParams, function (err, result) {
            if(err) {  Swal("", "Failed to register Candidate", "error"); }
            else {  
                Swal("", "Candidate registered successfully!!", "success");
                console.log("DynamoDBService: wrote entry"); 
                    }
        });
    }

    getDataFromCandidateLoginTbl(email: string, secretCode: string): Promise<any> {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: environment.ddb_CandidateLoginDetail_Tbl,
            Key: {
                Email: email
            },
            ProjectionExpression: 'SecretCode, CandidateName'
        };

        return new Promise((resolve, reject) => {
            DDB.get(params, function (err, data) {
                if (err) {
                    console.log(err);
                    Swal("", "Your secret code is wrong or you are not registered by admin", "error")
                    reject(err);
                } else {
                    if (data.Item) {
                        if (secretCode == data.Item.SecretCode) {
                            //this.candidateService.setcandidateName(data.Item.CandidateName);
                            resolve();
                        } else {
                            Swal("", "Your secret code is wrong!!", "error")
                            reject(err);
                        }
                    } else {
                        Swal("", "You are not registered by admin", "error")
                        reject(err);
                    }
                }
            });


        });
    }

    getTechnologies() {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: environment.ddb_technology_Tbl,
            ProjectionExpression: 'Technology_name'
        };


        return Observable.create(observer => {
            DDB.scan(params, function (err, data) {
                if (err) {
                    console.log(err);
                    observer.error(err);
                }
                observer.next(data);
                observer.complete();

            });
        });
    }


    getQuestions(technology: string) {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: environment.ddb_JavaQuesPool_Tbl,
            ExpressionAttributeNames: {
                "#tech": "Technology"
            },
            ExpressionAttributeValues: {
                ":tech_name": technology
            },
            ProjectionExpression: 'Question, Option1, Option2, Option3, Option4, Answer, Technology',
            FilterExpression: "#tech = :tech_name",
        };


        return Observable.create(observer => {
            DDB.scan(params, function (err, data) {
                console.log(data);
                if (err) {
                    console.log(err);
                    observer.error(err);
                }
                observer.next(data);
                observer.complete();

            });
        });
    }

    writeToTechnologyTbl(tech_name: string): void {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var itemParams =
        {
            TableName: environment.ddb_technology_Tbl,
            Item: {
                Technology_name: tech_name
            }
        };

        DDB.put(itemParams, function (result) {
            console.log("DynamoDBService: wrote entry");
        });
    }

    writeQuestionsIntoQuestionPool(item: Item) {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();
        let questionID =UUID.UUID();
        console.log(UUID);

        var itemParams =
        {
            TableName: environment.ddb_JavaQuesPool_Tbl,
            Item: {
                Technology: item.techName,
                Question: item.question,
                Option1: item.option1,
                Option2: item.option2,
                Option3: item.option3,
                Option4: item.option4,
                Answer: item.answer,
                QID: questionID
            }
        };

        DDB.put(itemParams, function (err, result) {
            if (err) {
                console.log(err);
                Swal("", "Question not saved!!", "error");
            }
        });

    }

}


