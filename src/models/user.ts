import { BankAccountId, UserId } from "@/types/Common";
import BankAccount from "./bank-account";

import { v4 as uuid } from "uuid"
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
        return new User(name, bankAccounts)
    }

    getId(){
        return this.id;
    }
}
export default User