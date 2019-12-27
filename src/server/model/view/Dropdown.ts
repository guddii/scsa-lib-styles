import { DropdownItem } from "./DropdownItem";

interface IDropdownOptions {
    label: string;
    text: string;
    items?: DropdownItem[];
}

export class Dropdown {
    private label: string;
    private text: string;
    private items: DropdownItem[];

    constructor(options: IDropdownOptions) {
        this.label = options.label;
        this.text = options.text;
        this.items = options.items;
    }
}
