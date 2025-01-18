import { BankAccountId, UserId } from "@/types/Common";

import { v4 as uuid } from "uuid"
import GlobalRegistry from "@/services/GlobalRegistry";
class User {

    id: UserId;
    name: string;
    bankAccounts: BankAccountId[]
    constructor (name, bankAccounts ){
        this.id = uuid()
        this.name = name;
        this.bankAccounts = bankAccounts
    }
    static create (name, bankAccounts){
        const user = new User(name, bankAccounts);
        GlobalRegistry.addUser(user)
        return user
    }

    getId(){
        return this.id;
    }
}
export default User