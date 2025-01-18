import { v4 as uuid } from "uuid"
import BankAccount from "./bank-account";
import { BankAccountId, BankId } from "@/types/Common";
import GlobalRegistry from "@/services/GlobalRegistry";
import TransactionService from "@/services/TransactionService";

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
        const bank = new Bank(properties || {});
        GlobalRegistry.addBank(bank)
        return bank
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
    send(senderUserId, receiverUserId, amount, receiverBankId?){
        const sender = GlobalRegistry.getUser(senderUserId)
        const receiver = GlobalRegistry.getUser(receiverUserId)
        const senderAccountsIds = sender.bankAccounts;
        const receiverAccountsIds = receiver.bankAccounts;

        const sendingAccounts = [];
        let receivingAccount = null;

        let bank: Bank = this;
        if(receiverBankId) {
            const allBanks = GlobalRegistry.getAllBanks();
            bank = allBanks[receiverBankId]
        }
    
        for (let bankAccountId of receiverAccountsIds){
            let bankAccount = bank.getAccount(bankAccountId);
            if(bankAccount) {
                receivingAccount = bankAccount;
                break;
            }
        }
        
        
        for(let bankAccountId of senderAccountsIds){
            let bankAccount = this.getAccount(bankAccountId);
            if(bankAccount) {
                sendingAccounts.push(bankAccount);
            }
        }

        let success = TransactionService.transaction(sendingAccounts, receivingAccount, amount, this.isNegativeAllowed)
        if(!success) throw Error("Insufficient funds")
    }
}
export default Bank