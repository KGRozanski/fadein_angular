import { Deserializable } from '../interfaces/deserializable.interface';

export class User implements Deserializable {
    username: String;
    mail: String;
    isAvatarSet: Boolean;
    avatar: String;
    filmography: Array<Object>;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
