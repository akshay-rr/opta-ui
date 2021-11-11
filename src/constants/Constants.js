import Parcel from '../models/Parcel';
import TokenHeader from '../models/TokenHeader';

class Constants {
    static CONTRACT_RINKEBY_ADDRESS = "0xb8bE02583bcb331b2123F62D1bc2882e85B47c84";
    static DAI_CONTRACT_ADDRESS = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea";
    static BAT_CONTRACT_ADDRESS = "0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99";
    static BASE_DECIMAL_18 = "1000000000000000000";
    static TEST_AMOUNT = "1000000000000000000000";
    static TEST_PARCEL = new Parcel(1, "TEST", [new TokenHeader('Basic Attention Token', 'BAT', 18)], [this.BAT_CONTRACT_ADDRESS], [this.TEST_AMOUNT]);
    static DISPLAY_PRECISION = 4;
    // static BACKEND_URL = "https://opta-v1-sd7xnovweq-el.a.run.app/API";
    static BACKEND_URL = "http://localhost:8000/API";
    static BASKET_URL = this.BACKEND_URL + "/baskets?fillTokens";
    static BASKET_BY_ID = this.BASKET_URL + "&id=";
    static USERS_URL = this.BACKEND_URL + "/users";
    static GET_USER_BY_WALLET = this.USERS_URL + "?walletAddress=";
    static TRANSACTIONS_URL = this.BACKEND_URL + "/transactions";
    static GET_TRANSACTION_BY_WALLET = this.TRANSACTION_URL + "?walletAddress=";

    static getBaseDecimalValue = (decimals) => {
        let value = "1";
        for (var i = 0; i<decimals; i++) {
            value+="0";
        }
        return value;
    }
}
export default Constants;