import TokenHeader from "../models/TokenHeader";
import Parcel from "../models/Parcel";
import MoneyFormatUtils from "./MoneyFormatUtils";

class ParcelAdapter {
    static convertToParcel = (parcelJson, id) => {
        const name = parcelJson.name;
        const tokenAddresses = parcelJson.components.map((entry) => {
          return entry.address;
        });
        const weights = parcelJson.components.map((entry) => {
          return MoneyFormatUtils.convertToPower18(entry.amount);
        });
        const tokenHeaders = parcelJson.components.map((entry) => {
          return new TokenHeader(entry.name, entry.symbol, 18);
        });
        return new Parcel(id, name, tokenHeaders, tokenAddresses, weights);
    }

    static convertToParcelList = (parcelJsonList) => {
        let parcelList = [];
        for (var i = 0; i < parcelJsonList.length; i++) {
            parcelList.push(this.convertToParcel(parcelJsonList[i], i));
        }
        return parcelList;
    }

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