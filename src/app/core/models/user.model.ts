import { Deserializable } from '../interfaces/deserializable.interface';

export class User implements Deserializable {
    username: any;
    mail: any;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
