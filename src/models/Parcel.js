import MoneyFormatUtils from "../utils/MoneyFormatUtils";

class Parcel {
    constructor(id, name, tokenHeaders, tokenAddresses, weights) {
        this.id = id;
        this.name = name;
        this.tokenHeaders = tokenHeaders;
        this.tokenAddresses = tokenAddresses;
        this.weights = weights;
    }

    toString = () => {
        let a = this.tokenAddresses.toString();
        let w = this.weights.toString();
        return a + '\n' + w;
    }
}
export default Parcel;