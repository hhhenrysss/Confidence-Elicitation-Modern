import {groupType} from "../../storage/store";

export const TutorialQuestions = [
    {
        id: 'tutorial-question-1',
        title: `<span style="color: #da3b01">Practice</span> Question 1`,
        text: 'Is the water composed of Hydrogen and Oxygen atoms?',
        correctAnswer: 'Yes',
        [groupType.linearNoBank]: [
            `What is the probability that you think your answer to the question is correct? By moving the slider, specify your confidence level to the question.`,
            `Since you may have a very strong belief that the answer to the question is "Yes", it would be appropriate for you to put the handle of slider all the way over to the right.`,
            `Based on your knowledge and experience, you may believe that a H2O molecule is composed of two Hydrogen atoms and one Oxygen atom, so choosing the "Yes" answer is more appropriate.`
        ],
        get [groupType.linearWithBank]() { return this[groupType.linearNoBank]; },
        [groupType.parabolicNoBank]: [
            `Click anywhere on the curve so that the slider appears. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you may have a very strong belief that the answer to the question is "Yes", it would be appropriate for you to put the handle of slider all the way over to the right. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that a H2O molecule is composed of two Hydrogen atoms and one Oxygen atom, so choosing the "Yes" answer is more appropriate.`
        ],
        get [groupType.parabolicWithBank]() { return this[groupType.parabolicNoBank]; }
    }, {
        id: 'tutorial-question-2',
        title: `<span style="color: #da3b01">Practice</span> Question 2`,
        text: 'Does planet Earth orbit around the the Moon?',
        correctAnswer: 'No',
        [groupType.linearNoBank]: [
            `What is the probability that you think your answer to the question is correct? By moving the slider, specify your confidence level to the question.`,
            `Since you may have a very strong belief that the answer to the question is "No", it would be appropriate for you to put the handle of slider all the way over to the right.`,
            `Based on your knowledge and experience, you may believe that the Moon orbits around Earth, not the other way around, so choosing the "No" answer is more appropriate.`
        ],
        get [groupType.linearWithBank]() { return this[groupType.linearNoBank]; },
        [groupType.parabolicNoBank]: [
            `Click anywhere on the curve so that the slider appears. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you may have a very strong belief that the answer to the question is "No", it would be appropriate for you to put the handle of slider all the way over to the right. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that the Moon orbits around Earth, not the other way around, so choosing the "No" answer is more appropriate.`
        ],
        get [groupType.parabolicWithBank]() { return this[groupType.parabolicNoBank]; }
    }, {
        id: 'tutorial-question-3',
        title: `<span style="color: #da3b01">Practice</span> Question 3`,
        text: `For a random person walking on campus who is 5'10'' tall, is that person a woman?`,
        correctAnswer: 'Yes',
        [groupType.linearNoBank]: [
            `What is the probability that you think your answer to the question is correct? By moving the slider, specify your confidence level to the question.`,
            `Since you may not be sure about the answer to this question, it would be appropriate for you to position the handle of slider between 0% to 100%.`,
            `Based on your knowledge and experience, you may believe that the result is indeterminate, and therefore choosing either "Yes" or "No" is reasonable.`
        ],
        get [groupType.linearWithBank]() { return this[groupType.linearNoBank]; },
        [groupType.parabolicNoBank]: [
            `Click anywhere on the curve so that the slider appears. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you may not be sure about the answer to this question, it would be appropriate for you to position the handle of slider between two extremes. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that the result is indeterminate, and therefore choosing either "Yes" or "No" is reasonable.`
        ],
        get [groupType.parabolicWithBank]() { return this[groupType.parabolicNoBank]; }
    }
];