import {groupType} from "../../storage/store";
import {Config} from "../../configurations";

const firstSentence = `You will receive $${Config.fixedPayment} for your participation in this experiment. This is yours to keep regardless of how you perform in the experiment.`;
const secondOptionalSentence = `You will also have a virtual bank which you will receive its cash value at the end of the experiment. The bank's initial value is $${Config.initialMoney}.`;
const thirdSentence = `<strong>The first three questions you will receive are only for practice and will not count toward your bank balance.</strong>`;
const fourthSentence = `Your answers to non-tutorial questions will determine your final bank balance. Correct answers will increase your bank balance from the initial $${Config.initialMoney}, and incorrect answers will lower your bank balance, but the balance will never go below zero.`;
const fifthOptionalSentence = `At the end of every ${Config.breakInterval} non-tutorial questions, you will receive a summary report of your earned reward/penalty in the most recent ${Config.breakInterval} non-tutorial questions as well as your overall bank balance up to that certain point of experiment`;

export const IntroductionStatements = {
    [groupType.linearWithBank]: [
        firstSentence, secondOptionalSentence, thirdSentence, fourthSentence, fifthOptionalSentence
    ],
    [groupType.parabolicWithBank]: [
        firstSentence, secondOptionalSentence, thirdSentence, fourthSentence, fifthOptionalSentence
    ],
    [groupType.linearNoBank]: [
        firstSentence, thirdSentence, fourthSentence
    ],
    [groupType.parabolicNoBank]: [
        firstSentence, thirdSentence, fourthSentence
    ]
};
