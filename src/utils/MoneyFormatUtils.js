import Constants from '../constants/Constants';
import BigNumber from 'bignumber.js';
class MoneyFormatUtils {
    static getBaseConvertedDenomination = (value) => {
        console.log("X:" + String(value));
        const n1 = new BigNumber(value);
        const n2 = new BigNumber(Constants.BASE_DECIMAL_18);
        const n3 = n1.dividedBy(n2);
        return n3.toPrecision(Constants.DISPLAY_PRECISION).toString();
    };
    static convertToPower18 = (value) => {
        const n1 = new BigNumber(value)
        const n2 = new BigNumber(Constants.BASE_DECIMAL_18);
        const n3 = n1.multipliedBy(n2);
        return n3.toString();
    }
}
export default MoneyFormatUtils;