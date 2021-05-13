import { Timestamped } from './Timestamped';
export interface Member extends Timestamped {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
