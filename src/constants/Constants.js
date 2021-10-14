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
    static BACKEND_URL = "https://opta-v1-sd7xnovweq-el.a.run.app/API/baskets";
}
export default Constants;