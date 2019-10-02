import {BasePage} from "./baseObject";

export class BankPage extends BasePage {
    constructor(elements, data, lastIndex) {
        super(elements);

        this.elements = elements;
        this.data = data;
        this.lastIndex = lastIndex;


    }
}