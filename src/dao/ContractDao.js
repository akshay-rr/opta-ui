import Constants from '../constants/Constants';
import ParcelEstimateException from '../exceptions/ParcelEstimateException';
import MoneyFormatUtils from '../utils/MoneyFormatUtils';

class ContractDao {
    constructor (state) {
        this.state = state;
    }

    getEstimate = async (tokenAddresses, tokenAmounts, quantity) => {
        try {
            let totalAmounts = tokenAmounts.map((value) => {
                return MoneyFormatUtils.getTotalAmounts(quantity, value);
            });
            let contractInstance = await this.state.mainContract.at(Constants.CONTRACT_RINKEBY_ADDRESS);
            let netAmounts = await contractInstance.getNetAmountIn(tokenAddresses, totalAmounts);
            console.log("Fetched Amounts: %s", netAmounts);
            return netAmounts;
        } catch (e) {
            console.error(e);
            throw new ParcelEstimateException("E1");
        }
    };

    purchaseParcel = async (tokenAddresses, tokenAmounts, quantity, amount) => {
        try {
            let totalAmounts = tokenAmounts.map((value) => {
                return MoneyFormatUtils.getTotalAmounts(quantity, value);
            });
            let contractInstance = await this.state.mainContract.at(Constants.CONTRACT_RINKEBY_ADDRESS);
            let txn = await contractInstance.purchaseTokenSet(tokenAddresses, totalAmounts, {from: this.state.account, value: amount});
            return txn;
        } catch (e) {
            console.error(e);
            throw new ParcelEstimateException("E2");
        }
    }
}
export default ContractDao;

