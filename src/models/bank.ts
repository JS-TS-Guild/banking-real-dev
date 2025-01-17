import { v4 as uuid } from "uuid"
import BankAccount from "./bank-account";
import { BankAccountId, BankId } from "@/types/Common";

 class Bank {
    id: BankId;    
    isNegativeAllowed: Boolean;
    bankAccounts: {
        [key: BankAccountId] : BankAccount
    };

    constructor(properties){
        this.id = uuid();
        this.isNegativeAllowed = properties.isNegativeAllowed || false
        this.bankAccounts = {}
    }
    static create(properties?: any){
        return new Bank(properties || {})
    }
    getId(){
        return this.id;
    }
    createAccount(balance){
        let bankAccount = BankAccount.create(balance);
        let id = bankAccount.getId()
        this.bankAccounts[id] = bankAccount
        return bankAccount
    }
    getAccount(id){
        return this.bankAccounts[id]
    }
    send(user1, user2, amount){

    }
}
export default Bank