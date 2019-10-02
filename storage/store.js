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
        this.Type = '';
        this.Responses = [];
        this.TutorialResponses = [];
    }
}

export const GroupType = {
    linearWithBank: 'ABC',
    parabolicWithBank: 'BCD',
    linearNoBank: 'CDE',
    parabolicNoBank: 'DEF'
};

export const GroupTypeUtils = {
    groupTypeValuesSet: new Set(Object.values(GroupType)),
    linearValuesSet: new Set([GroupType.linearWithBank, GroupType.linearNoBank]),
    parabolicValuesSet: new Set([GroupType.parabolicWithBank, GroupType.parabolicNoBank]),
    /**
     * @return {boolean}
     */
    isGroupType(str) {
        return this.groupTypeValuesSet.has(str);
    },
    isLinear(str) {
        return this.linearValuesSet.has(str);
    },
    isParabolic(str) {
        return this.parabolicValuesSet.has(str);
    }
};