import { Deserializable } from '../interfaces/deserializable.interface';

export class User implements Deserializable {
    username: any;
    mail: any;
    isAvatarSet: boolean;
    avatar: string;

    constructor() {}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
