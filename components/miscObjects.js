import $ from "jquery";
import {ClassNames} from "./styles";

export function CreateOption(config) {
    if (config === undefined) {
        config = [
            {name: 'Yes', value: 'Yes'},
            {name: 'No', value: 'No'}
        ];
    }
    const firstHalf = `
        <div class="question-options">
            <select>
    `;
    const secondHalf = `
            </select>
        </div>
     `;
    const list = config.map(obj => {
        return `<option value="${obj.value}">${obj.name}</option>`;
    });
    return ([firstHalf].push(...list, secondHalf)).join('');
}

export function CreateSectionTitle(str) {
    return $(`<h1 class="section-title">${str}</h1>`);
}

export function CreateQuestionTitle(str) {
    return $(`<p class="question-title">${str}</p>`);
}

export function CreateExplanation(str) {
    return $(`<p class="question-explanation">${str}</p>`);
}