import {GroupType} from "../../storage/store";

export const TutorialQuestions = [
    {
        id: 'tutorial-question-1',
        title: 'Sample Question 1',
        text: 'Is the water composed of Hydrogen and Oxygen atoms?',
        correctAnswer: 'Yes',
        [GroupType.linearNoBank]: [
            `What is the probability that you think your answer to the question is correct? Click anywhere on the bar so that the slider appears, then by moving the slider, specify your confidence level to the question.`,
            `Since you have more tendency toward the "Yes", you don't stay at 50% and prefer to move the slider to the right of 50%. The stronger is your conviction that your answer is correct, the more you slide to the right.`,
            `Based on your knowledge and experience, you may believe that a H2O molecule is composed of two Hydrogen atoms and one Oxygen atom, so choosing the "Yes" answer is more appropriate.`
        ],
        [GroupType.linearWithBank]: [
            `What is the probability that you think your answer to the question is correct? Click anywhere on the bar so that the slider appears, then by moving the slider, specify your confidence level to the question.`,
            `Since you have more tendency toward the "Yes", you don't stay at 50% and prefer to move the slider to the right of 50%. The stronger is your conviction that your answer is correct, the more you slide to the right.`,
            `Based on your knowledge and experience, you may believe that a H2O molecule is composed of two Hydrogen atoms and one Oxygen atom, so choosing the "Yes" answer is more appropriate.`
        ],
        [GroupType.parabolicNoBank]: [
            `Click anywhere on the curve so that the slider appears, then by moving the slider, specify your answer to Part 2. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you have some evidence to support the “Yes” answer, it may be acceptable to move the slider all the way to the bottom of the curve. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that a H2O molecule is composed of two Hydrogen atoms and one Oxygen atom, so choosing the "Yes" answer is more appropriate.`
        ],
        [GroupType.parabolicWithBank]:  [
            `Click anywhere on the curve so that the slider appears, then by moving the slider, specify your answer to Part 2. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you have some evidence to support the “Yes” answer, it may be acceptable to move the slider all the way to the bottom of the curve. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that a H2O molecule is composed of two Hydrogen atoms and one Oxygen atom, so choosing the "Yes" answer is more appropriate.`
        ]
    }, {
        id: 'tutorial-question-2',
        title: 'Sample Question 2',
        text: 'Does planet Earth orbit around the the Moon?',
        correctAnswer: 'No',
        [GroupType.linearNoBank]: [
            `What is the probability that you think your answer to the question is correct? Click anywhere on the bar so that the slider appears, then by moving the slider, specify your confidence level to the question.`,
            `Since you have more tendency toward the “No", you don't stay at 50% and prefer to move the slider to the right of 50%. The stronger is your conviction that your answer is correct, the more you slide to the right.`,
            `Based on your knowledge and experience, you may believe that the Moon orbits around Earth, not the other way around, so choosing the "No" answer is more appropriate.`
        ],
        [GroupType.linearWithBank]: [
            `What is the probability that you think your answer to the question is correct? Click anywhere on the bar so that the slider appears, then by moving the slider, specify your confidence level to the question.`,
            `Since you have more tendency toward the “No", you don't stay at 50% and prefer to move the slider to the right of 50%. The stronger is your conviction that your answer is correct, the more you slide to the right.`,
            `Based on your knowledge and experience, you may believe that the Moon orbits around Earth, not the other way around, so choosing the "No" answer is more appropriate.`
        ],
        [GroupType.parabolicNoBank]: [
            `Click anywhere on the curve so that the slider appears, then by moving the slider, specify your answer to Part 2. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you have some evidence to support the “No” answer, it may be acceptable to move the slider all the way to the bottom of the curve. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that the Moon orbits around Earth, not the other way around, so choosing the "No" answer is more appropriate.`
        ],
        [GroupType.parabolicWithBank]: [
            `Click anywhere on the curve so that the slider appears, then by moving the slider, specify your answer to Part 2. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you have some evidence to support the “No” answer, it may be acceptable to move the slider all the way to the bottom of the curve. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that the Moon orbits around Earth, not the other way around, so choosing the "No" answer is more appropriate.`
        ]
    }, {
        id: 'tutorial-question-3',
        title: 'Sample Question 3',
        text: 'Does planet Earth orbit around the the Moon?',
        correctAnswer: 'Yes',
        [GroupType.linearNoBank]: [
            `What is the probability that you think your answer to the question is correct? Click anywhere on the bar so that the slider appears, then by moving the slider, specify your confidence level to the question.`,
            `Since you are not sure about which side will be at the top after a random coin toss, your answer should lie between 0% to 100%.`,
            `Based on your knowledge and experience, you may believe that the result depends and may vary each time a coin is tossed.`
        ],
        [GroupType.linearWithBank]: [
            `What is the probability that you think your answer to the question is correct? Click anywhere on the bar so that the slider appears, then by moving the slider, specify your confidence level to the question.`,
            `Since you are not sure about which side will be at the top after a random coin toss, your answer should lie between 0% to 100%.`,
            `Based on your knowledge and experience, you may believe that the result depends and may vary each time a coin is tossed.`
        ],
        [GroupType.parabolicNoBank]: [
            `Click anywhere on the curve so that the slider appears, then by moving the slider, specify your answer to Part 2. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you are not sure about which side will be at the top after a random coin toss, your answer should lie between the two extremes. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that the result depends and may vary each time a coin is tossed.`
        ],
        [GroupType.parabolicWithBank]: [
            `Click anywhere on the curve so that the slider appears, then by moving the slider, specify your answer to Part 2. As you move the slider on the curve, the green bar always shows how many points you will earn if your answer is correct. The red bar shows how many points you will lose if your answer is incorrect. Move the slider on the curve to a point where the relative sizes of the green and red bar represents what you are truly willing to gain or lose in case your answer is correct or incorrect.`,
            `Since you are not sure about which side will be at the top after a random coin toss, your answer should lie between the two extremes. The right place for the slider is somewhere in between where your belief about the likelihood of winning versus losing justifies the length of red and green bars at that point. The more you believe your answer is correct, the more you want to move towards the bottom.`,
            `Based on your knowledge and experience, you may believe that the result depends and may vary each time a coin is tossed.`
        ]
    }
];