import $ from "jquery";

class OptionsElement {
    constructor(config) {
        if (config === undefined) {
            config = [
                {name: 'Yes', value: 'Yes'},
                {name: 'No', value: 'No'}
            ];
        }
        this.config = config;
        this.selectedItem = null;
        this.obj = null;
        this.allInputElements = [];

        this.render();
    }
    render() {
        const wrapper = $('<div class="question-options"></div>');
        const allInputElements = [];
        for (let i = 0; i < this.config.length; i += 1) {
            const currentConfig = this.config[i];
            const currentId = `radio-${i}`;
            const inputElement = $(`<input id="${currentId}" type="radio" value="${currentConfig.value}">`);
            allInputElements.push(inputElement);
            const labelElement = $(`<label for="${currentId}">${currentConfig.name}</label>`);
            const inputLabelWrapperElement = $(`<div class="question-option-wrapper"></div>`);
            inputLabelWrapperElement.append(inputElement);
            inputLabelWrapperElement.append(labelElement);
            wrapper.append(inputLabelWrapperElement);
        }
        const that = this;
        wrapper.on('click', 'input', function (e) {
            const elem = $(this);
            const id = elem.attr('id');
            elem.prop('checked', true);
            that.selectedItem = elem.val();
            for (const input of allInputElements) {
                if (input.attr('id') !== id) {
                    input.prop('checked', false);
                }
            }
        });

        this.obj = wrapper;
        this.allInputElements = allInputElements;
    }
    get jQueryObj() {
        return this.obj;
    }
    get value() {
        return this.selectedItem;
    }
    set value(str) {
        this.selectedItem = null;
        for (const elem of this.allInputElements) {
            if (str !== '' && str != null && elem.val() === str) {
                elem.prop('checked', true);
                this.selectedItem = elem.val();
            } else {
                elem.prop('checked', false);
            }
        }
    }
}

class BannerElement {
    constructor(mainText, confirmText, closeText, confirmHandler) {
        const wrapper = $('<div class="banner-wrapper"></div>');
        const main = $(`<div class="banner-main-text">${mainText}</div>`);

        wrapper.append(main);
        if (confirmText != null && closeText != null && confirmHandler != null) {
            const actionsWrapper = $('<div class="banner-actions-wrapper"></div>');
            const confirmAction = $(`<button class="banner-action-button">${confirmText}</button>`);
            const closeAction = $(`<button class="banner-action-button">${closeText}</button>`);
            confirmAction.click(() => confirmHandler());
            closeAction.click(() => wrapper.remove());
            wrapper.append(actionsWrapper.append(confirmAction).append(closeAction));
        }
        this.element = wrapper;
    }
    get jQueryObj() {
        return this.element;
    }
    addBlue() {
        this.element.addClass('blue');
        this.element.removeClass('red');
    }
    addRed() {
        this.element.addClass('red');
        this.element.removeClass('blue');
    }
}

export function createBanner(mainText, confirmText, closeText, confirmHandler) {
    return new BannerElement(mainText, confirmText, closeText, confirmHandler);
}

export function createOption(config) {
    return new OptionsElement(config);
}

export function createSectionTitle(str) {
    return $(`<h1 class="section-title">${str}</h1>`);
}

export function createQuestionTitle(str) {
    return $(`<p class="question-title">${str}</p>`);
}

export function createExplanation(str) {
    return $(`<p class="question-explanation">${str}</p>`);
}