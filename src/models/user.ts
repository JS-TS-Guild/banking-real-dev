import { BankAccountId, UserId } from "@/types/Common";
export const UserAccounts = new Map<UserId, BankAccountId[]>();
export default class User {
    private id: UserId
    private name: string;
    private accountIds: BankAccountId[];

    constructor(name: string, accountIds: BankAccountId[]) {
        this.id = Math.random().toString()
        this.name = name;
        this.accountIds = accountIds;
    }
    static create(name: string, accountIds: BankAccountId[]): User {
        const user = new User(name, accountIds);
        UserAccounts.set(user.id, accountIds);
        return user
    }
    getId(): UserId {
        return this.id
    }
}