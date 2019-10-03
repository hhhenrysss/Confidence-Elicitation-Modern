export class Response {
    static calculateBrier(predicted, actual) {
        return Math.pow(predicted - actual, 2);
    }
    constructor(questionID, correctAnswer, attemptedAnswer, graphValue) {
        this.questionID = questionID;
        this.correctAnswer = correctAnswer;
        this.attemptedAnswer = attemptedAnswer;
        this.graphValue = typeof graphValue === 'number' ? graphValue : graphValue.x;
        this.brierScore = Response.calculateBrier(this.graphValue, this.correctAnswer === 'Yes' ? 1 : 0);
    }
    calculateMoney() {
        if (this.correctAnswer === this.attemptedAnswer) { // Correct
            if (this.graphValue === 0.5){
                return 0;
            } else {
                return this.graphValue * 0.25;
            }
        } else {
            if (this.graphValue === 0.5){
                return 0;
            } else {
                return 0.25 * (-3 * Math.pow(this.graphValue, 2));
            }
        }
    }
}

export class SurveyResults {
    constructor() {
        this.SubjectID = '';
        this.Type = '';
        this.TotalBankBalance = 12;
        this.RoundRewardsHistory = [];
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
    bankValuesSet: new Set([GroupType.linearWithBank, GroupType.parabolicWithBank]),
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
    },
    isShowBank(str) {
        return this.bankValuesSet.has(str);
    }
};