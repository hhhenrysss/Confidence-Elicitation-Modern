export class Response {
    constructor(questionID, correctAnswer, attemptedAnswer, graphValue) {
        this.questionID = questionID;
        this.correctAnswer = correctAnswer;
        this.attemptedAnswer = attemptedAnswer;
        this.graphValue = typeof graphValue === 'number' ? graphValue : graphValue.x;
        this.brierScore = this.calculateBrier();
    }
    calculateBrier() {
        if (this.correctAnswer === 'Yes') {
            if (this.attemptedAnswer === 'Yes') {
                return Math.pow(this.graphValue - 1, 2);
            } else {
                return Math.pow(1 - this.graphValue - 1, 2);
            }
        } else {
            if (this.attemptedAnswer === 'Yes') {
                return Math.pow(this.graphValue, 2);
            } else {
                return Math.pow(1-this.graphValue, 2);
            }
        }
    }
    calculateMoney() {
        return -1 * this.brierScore + 0.25;
    }
}

export class SurveyResults {
    constructor() {
        this.SubjectID = '';
        this.Type = '';
        this.ReadableType = '';
        this.TotalBankBalance = 12;
        this.RoundRewardsHistory = [];
        this.Responses = [];
        this.TutorialResponses = [];
    }
}

export const GroupType = require('../../types/groupType');

export const GroupTypeUtils = {
    groupTypeValuesSet: new Set(Object.values(GroupType)),
    linearValuesSet: new Set([GroupType.linearWithBank, GroupType.linearNoBank]),
    parabolicValuesSet: new Set([GroupType.parabolicWithBank, GroupType.parabolicNoBank]),
    bankValuesSet: new Set([GroupType.linearWithBank, GroupType.parabolicWithBank]),
    /**
     * @return {boolean}
     */
    isGroupType(str) {
        if (str == null) { return false; }
        return this.groupTypeValuesSet.has(str);
    },
    isLinear(str) {
        return this.linearValuesSet.has(str);
    },
    isParabolic(str) {
        return this.parabolicValuesSet.has(str);
    },
    isShowBank(str) {
        return this.bankValuesSet.has(str);
    }
};