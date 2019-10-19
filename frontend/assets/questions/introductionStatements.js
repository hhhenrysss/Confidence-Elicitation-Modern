import {groupType} from "../../storage/store";
import {Config} from "../../configurations";

export const IntroductionStatements = {
    [groupType.linearWithBank]: [
        `You will receive $${Config.fixedPayment} for your participation in this experiment. This is yours to keep regardless of how you perform in the experiment.`,
        `You will also have a virtual bank which you will receive its cash value at the end of the experiment. The bank's initial value is $${Config.initialMoney}.`,
        `By answering each question, your reward or penalty from that question will increase or decrease your bank balance`,
        `At the end of every ${Config.breakInterval} questions, you will receive a summary report of your earned reward/penalty in the most recent ${Config.breakInterval} questions as well as your overall bank balance up to that certain point of experiment`,
        `Your answers will determine your final bank balance. Correct answers will increase your bank balance from the initial $${Config.initialMoney}, and incorrect answers will lower your bank balance, but the balance will never go below zero.`
    ],
    [groupType.parabolicWithBank]: [
        `You will receive $${Config.fixedPayment} for your participation in this experiment. This is yours to keep regardless of how you perform in the experiment.`,
        `You will also have a virtual bank which you will receive its cash value at the end of the experiment. The bank's initial value is $${Config.initialMoney}.`,
        `By answering each question, your reward or penalty from that question will increase or decrease your bank balance`,
        `At the end of every ${Config.breakInterval} questions, you will receive a summary report of your earned reward/penalty in the most recent ${Config.breakInterval} questions as well as your overall bank balance up to that certain point of experiment`,
        `Your answers will determine your final bank balance. Correct answers will increase your bank balance from the initial $${Config.initialMoney}, and incorrect answers will lower your bank balance, but the balance will never go below zero.`
    ],
    [groupType.linearNoBank]: [
        `You will receive $${Config.fixedPayment} for your participation in this experiment. This is yours to keep regardless of how you perform in the experiment.`,
        `You will also have a virtual bank which you will receive its cash value at the end of the experiment. The bank's initial value is $${Config.initialMoney}.`,
        `By answering each question, your reward or penalty from that question will increase or decrease your bank balance`,
        `Your answers will determine your final bank balance. Correct answers will increase your bank balance from the initial $${Config.initialMoney}, and incorrect answers will lower your bank balance, but the balance will never go below zero.`
    ],
    [groupType.parabolicNoBank]: [
        `You will receive $${Config.fixedPayment} for your participation in this experiment. This is yours to keep regardless of how you perform in the experiment.`,
        `You will also have a virtual bank which you will receive its cash value at the end of the experiment. The bank's initial value is $${Config.initialMoney}.`,
        `By answering each question, your reward or penalty from that question will increase or decrease your bank balance`,
        `Your answers will determine your final bank balance. Correct answers will increase your bank balance from the initial $${Config.initialMoney}, and incorrect answers will lower your bank balance, but the balance will never go below zero.`
    ]
};
