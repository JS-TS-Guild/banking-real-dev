import { BankAccountId, UserId } from "@/types/Common";
import { v4 as uuid } from "uuid";
import { UserAccounts } from "./user";

type AccountData = { balance: number; isNegativeAllowed: boolean };
export const AccountsMap = new Map<BankAccountId, AccountData>();
export default class Bank {
  private id: BankAccountId;
  isNegativeAllowed: boolean;

  constructor(private options?: { isNegativeAllowed?: boolean }) {
    this.id = uuid(); // Unique ID for the bank
    this.isNegativeAllowed = this.options?.isNegativeAllowed || false;
  }

  static create(options?: { isNegativeAllowed?: boolean }): Bank {
    return new Bank(options);
  }

  createAccount(initialBalance: number): { getId: () => BankAccountId } {

    const accountId: BankAccountId = uuid(); // Unique ID for the account
    this.id = accountId
    AccountsMap.set(accountId, {
      balance: initialBalance,
      isNegativeAllowed: this.isNegativeAllowed,
    });

    return {
      getId: () => accountId,
    };
  }

  getId(): BankAccountId {
    return this.id;
  }

  getAccount(accountId: BankAccountId) {
    const account = AccountsMap.get(accountId);
    if (!account) {
      throw new Error(`Account with ID ${accountId} does not exist`);
    }
    return {
      getBalance: () => account.balance,
    };
  }
  send(senderUserId: UserId, receiverUserId: UserId, amount: number, bankId?: BankAccountId): void {
    // Retrieve the sender and receiver account IDs from the UserAccounts map
    const senderAccountIds = UserAccounts.get(senderUserId);
    const receiverAccountIds = UserAccounts.get(receiverUserId);

    if (!senderAccountIds || !receiverAccountIds) {
      throw new Error("Sender or receiver does not have associated accounts");
    }
    // Assume we're transferring between the first account of each user (for simplicity)

    let senderAccountId = senderAccountIds[0];
    if (bankId) {
      for (let i = 0; i < senderAccountIds.length; i++) {
        const senderAccount = AccountsMap.get(senderAccountIds[i])
        const balance = senderAccount?.balance - amount;
        if (balance) {
          senderAccountId = senderAccountIds[i];
        }
        if (balance < 0 && !senderAccount?.isNegativeAllowed) {
          throw new Error("Insufficient funds");
        }
        if (balance < 0 && senderAccount?.isNegativeAllowed) {
          senderAccountId = senderAccountIds[i];
        }
      }
    }


    const receiverAccountId = receiverAccountIds[0];
    // Deduct from sender's account
    if (AccountsMap.get(senderAccountId)!.balance - amount < 0 && !AccountsMap.get(senderAccountId)!.isNegativeAllowed) {
      throw new Error("Insufficient funds");
    }
    AccountsMap.get(senderAccountId)!.balance -= amount;

    // Add to receiver's account
    AccountsMap.get(receiverAccountId)!.balance += amount;
  }
}
