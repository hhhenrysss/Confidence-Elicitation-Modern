export class Response {
    constructor(questionID, correctAnswer, attemptedAnswer, graphValue) {
        this.questionID = questionID;
        this.correctAnswer = correctAnswer;
        this.attemptedAnswer = attemptedAnswer;
        this.graphValue = graphValue;
    }
}

export class SurveyResults {
    constructor() {
        this.SubjectID = '';
        this.GroupType = '';
        this.Responses = [];
        this.TutorialResponses = [];
    }
}

export const GroupType = {
    linear: 'Linear',
    parabolic: 'Parabolic'
};