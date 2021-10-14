import Constants from '../constants/Constants';
import ParcelEstimateException from '../exceptions/ParcelEstimateException';

class ContractDao {
    constructor (state) {
        this.state = state;
    }

    getEstimate = async (tokenAddresses, tokenAmounts) => {
        try {
            let contractInstance = await this.state.mainContract.at(Constants.CONTRACT_RINKEBY_ADDRESS);
            let netAmounts = await contractInstance.getNetAmountIn(tokenAddresses, tokenAmounts);
            console.log("Fetched Amounts: %s", netAmounts);
            return netAmounts;
        } catch (e) {
            console.error(e);
            throw new ParcelEstimateException("E1");
        }
    };

    purchaseParcel = async (tokenAddresses, tokenAmounts, amount) => {
        try {
            let contractInstance = await this.state.mainContract.at(Constants.CONTRACT_RINKEBY_ADDRESS);
            let netSpend = await contractInstance.purchaseTokenSet(tokenAddresses, tokenAmounts, {from: this.state.account, value: amount});
            console.log("Net Spend: %s", netSpend);
            return netSpend;
        } catch (e) {
            console.error(e);
            throw new ParcelEstimateException("E2");
        }
    }
}
export default ContractDao;

