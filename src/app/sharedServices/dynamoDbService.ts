import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import * as AWS from "aws-sdk";
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UUID } from 'angular2-uuid';
import { Item } from "../sharedServices/item";
import { Technologiesweightage } from '../sharedServices/technologiesweightage'

@Injectable()
export class DynamoDBService {

    constructor() {

    }

    writeToCandidateLoginTbl(email: string, secretCode: string, date: string, name: string, tech: Technologiesweightage[]): Promise<any> {

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
                CandidateName: name,
                Technologies: tech
            }
        };

        return new Promise((resolve, reject) => {
            DDB.put(itemParams, function (err) {
                if (err) {
                    Swal("", "Failed to register Candidate", "error");
                    reject(err);
                }
                else {
                    Swal("", "Candidate registered successfully!!", "success");
                    resolve();
                }
            });
        });
    }

    updateRegisterCandidateFlag(email: string, status: string): Promise<any> {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var itemParams =
        {
            TableName: environment.db_CandidateTestDetail_Tb,
            Item: {
                email: email,
                TestStatus: status
            }
        };

        return new Promise((resolve, reject) => {
            DDB.put(itemParams, function (err) {
                if (err) {
                    //Swal("", "Failed to update CandidateTestDetail", "error");
                    reject(err);
                }
                else {                
                    resolve();
                }
            });
        });
    }

    updateRegisterCandidateStatus(email: string, status: string, name: string, noOfQuestion: string, Duration: {hour : number, minute : number}, technologies: String): Promise<any> {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var itemParams =
        {
            TableName: environment.db_CandidateTestDetail_Tb,
            Item: {
                email: email,
                TestStatus: status,
                CandidateName: name,
                NoOfQuestion: noOfQuestion,
                TestDuration: Duration,
                Technologies: technologies
            }
        };

        return new Promise((resolve, reject) => {
            DDB.put(itemParams, function (err) {
                if (err) {
                    Swal("", "Failed to update CandidateTestDetail", "error");
                    reject(err);
                }
                else {                
                    resolve();
                }
            });
        });
    }

    getTestDetails() {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: environment.db_CandidateTestDetail_Tb,
            ProjectionExpression: 'email, TestStatus, CandidateName, NoOfQuestion, TestDuration, Technologies'
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
            ProjectionExpression: 'SecretCode, CandidateName, Technologies'
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
                if (err) {
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

        DDB.put(itemParams, function () {
            console.log("DynamoDBService: wrote entry");
        });
    }

    writeQuestionsIntoQuestionPool(item: Item) {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();
        let questionID = UUID.UUID();
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

        DDB.put(itemParams, function (err) {
            if (err) {
                console.log(err);
                Swal("", "Question not saved!!", "error");
            }
        });

    }


    getCandidateDetail(email: string) {
        console.log(email)

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
            ProjectionExpression: 'SecretCode, CandidateName, Technologies'
        };

        return Observable.create(observer => {
            DDB.get(params, function (err, data) {
                if (err) {
                    observer.error(err);
                }
                observer.next(data);
                observer.complete();
            });
        });
    }

    writeIntoCriteriaTbl(email: string, name: string, noOfQuestion: string, duration: {hour : number, minute : number}, questionType: string, tech: Technologiesweightage[]): Promise<any> {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var itemParams =
        {
            TableName: environment.ddb_CandidateCriteria_Tbl,
            Item: {
                email: email,
                NoOfQuestion: noOfQuestion,
                TestDuration: duration,
                QuestionType: questionType,
                CandidateName: name,
                Technologies: tech
            }
        };

        return new Promise((resolve, reject) => {
            DDB.put(itemParams, function (err) {
                if (err) {
                    console.log(err);
                    Swal("", "Failed to register Candidate Criteria", "error");
                    reject(err);
                }
                else {
                    Swal("", "Candidate Criteria updated successfully!!", "success");
                    resolve();
                }
            });
        });
    }

    writeIntoCandidateQuestionTbl(email : string, question: string): void {

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var itemParams =
        {
            TableName: environment.ddb_CandidateQuestions_Tbl,
            Item: {
                Questions: question,
                Email : email
            }
        };

        DDB.put(itemParams, function (err) {

            if(err) {
                console.log(err);
            }
            console.log("DynamoDBService: wrote entry");
        });
    }

    getDetailsFromCandidateCriteriaTbl(email : string) {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: environment.ddb_CandidateCriteria_Tbl,
            Key: {
                email: email
            },
            ProjectionExpression: 'CandidateName, Technologies, TestDuration'
        };

        return Observable.create(observer => {
            DDB.get(params, function (err, data) {
                if (err) {
                    observer.error(err);
                }
                observer.next(data);
                observer.complete();
            });
        });
    }

    getQuestionsForCandidate(email : string) {       
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId
        })
        AWS.config.update({ region: environment.region });

        var DDB = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: environment.ddb_CandidateQuestions_Tbl,
            Key: {
                Email: email
            },
            ProjectionExpression: 'Questions'
        };

        return Observable.create(observer => {
            DDB.get(params, function (err, data) {
                if (err) {
                    observer.error(err);
                }
                observer.next(data);
                observer.complete();
            });
        });
    }


}


