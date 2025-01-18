import Bank from "@/models/bank";
import User from "@/models/user"
import { BankId, UserId } from "@/types/Common"

class GlobalRegistry{
    static users: {
        [key: UserId]: User
    } = {}
    static banks: {
        [key: BankId]: Bank
    } = {}

    static addUser(user: User){
        this.users[user.getId()] = user
    }
    static addBank(bank: Bank){
        this.banks[bank.getId()] = bank
    }
    static getUser(id){
        return this.users[id]
    }
    static getAllBanks(){
        return this.banks
    }
    static clear (){
        this.users = {}
        this.banks = {}
    }
}
export default GlobalRegistry