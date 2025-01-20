import { AccountsMap } from "@/models/bank";
import { UserAccounts } from "@/models/user"

class GlobalRegistry {

    static clear() {
        UserAccounts.clear();
        AccountsMap.clear();
    }
}

export default GlobalRegistry