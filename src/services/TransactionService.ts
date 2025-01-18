import BankAccount from "@/models/bank-account"

class TransactionService {
    static transaction(sendingAccounts: BankAccount[], receivingAccount, amountToBeSent, isNegativeAllowed){
        /* check if sendingAccounts has amount */
        if(!isNegativeAllowed){
            const totalBalance = sendingAccounts.reduce((total, curr) => curr.getBalance() + total , 0 )
            if(totalBalance < amountToBeSent) return false;
        }

        let amountLeftToBeSent = amountToBeSent
        for (let account of sendingAccounts){
            const balance = account.getBalance();
            if(balance > amountLeftToBeSent || isNegativeAllowed){
                account.setBalance(balance - amountLeftToBeSent);
                receivingAccount.setBalance(receivingAccount.getBalance() + amountLeftToBeSent);
                break;
            }
            else{
                account.setBalance(0);
                receivingAccount.setBalance(receivingAccount.getBalance() + balance);
                amountLeftToBeSent = amountLeftToBeSent - balance
            }
        }
        return true
    }
}

export default TransactionService