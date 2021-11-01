import TokenHeader from "../models/TokenHeader";
import Parcel from "../models/Parcel";
import MoneyFormatUtils from "./MoneyFormatUtils";
import Token from "../models/Token";

class ParcelAdapter {

    static getParcelTokenDetails = (parcel) => {
        let tokenDetails = [];
        for (var i = 0; i < parcel.tokenHeaders.length; i++) {
            tokenDetails.push({
                id: i,
                name: parcel.tokenHeaders[i].name,
                symbol: parcel.tokenHeaders[i].symbol,
                decimals: parcel.tokenHeaders[i].decimals,
                weight: parcel.weights[i]
            });
        }
        return tokenDetails;
    }
}
export default ParcelAdapter;