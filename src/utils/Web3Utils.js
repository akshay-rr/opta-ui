class Web3Utils {
    static chainMap = {
        "1": "Mainnet",
        "3": "Ropsten",
        "4": "Rinkeby",
        "5": "Goerli"
    }
    
    static getChainName = (chainId) => {
        let chainName = this.chainMap[String(chainId)];
        if(chainName) {
            return chainName;
        }
        return "Chain " + chainId;
    }

    static getTransactionUrl = (txn) => {
        return "https://rinkeby.etherscan.io/tx/" + txn;
    }
}
export default Web3Utils;