import { Deserializable } from '../interfaces/deserializable.interface';

export class User implements Deserializable {
    username: String;
    mail: String;
    isAvatarSet: Boolean;
    avatar: String;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
