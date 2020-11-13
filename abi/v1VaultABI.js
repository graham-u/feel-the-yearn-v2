import ERC20ABI from "./ERC20ABI.json";
import minimumVaultABI from "./minimumVaultABI.json";

const v1VaultABI = ERC20ABI.concat(minimumVaultABI);

export default v1VaultABI;
