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
}
export default Web3Utils;