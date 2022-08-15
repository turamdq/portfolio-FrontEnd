export class Persona {
    id?: number;
    name: string;
    position: string;
    about: string;

    constructor(name: string, position: string, about: string) {
        this.name = name;
        this.position = position;
        this.about = about;
    }
}
