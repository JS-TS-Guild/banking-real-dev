import { BankAccountId } from "@/types/Common";
import { v4 as uuid } from "uuid"
class BankAccount {

    id: BankAccountId;
    balance: number;
    constructor (balance){
        this.id = uuid();
        this.balance = balance;
    }
    static create(balance: any) {
        return new BankAccount(balance);
    }
    getBalance(){
        return this.balance
    }
    getId(){
        return this.id
    }
}
export default BankAccount