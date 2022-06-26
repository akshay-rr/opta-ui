class Constants {
    static CONTRACT_RINKEBY_ADDRESS = "0xb8bE02583bcb331b2123F62D1bc2882e85B47c84";
    static BASE_DECIMAL_18 = "1000000000000000000";
    static TEST_AMOUNT = "1000000000000000000000";
    static SUPPORTED_CHAIN_IDS = [4];

    static getBaseDecimalValue = (decimals) => {
        let value = "1";
        for (var i = 0; i<decimals; i++) {
            value+="0";
        }
        return value;
    }
}
export default Constants;