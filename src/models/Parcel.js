import MoneyFormatUtils from '../utils/MoneyFormatUtils';
import Token from './Token';

class Parcel {
    constructor(id, name, tokens, description, risk, popularity, investors, invested, categories) {
        this.id = id;
        this.name = name;
        this.tokens = tokens;
        this.description = description;
        this.risk = risk;
        this.popularity = popularity;
        this.investors = investors;
        this.invested = invested;
        this.categories = categories;
    }
    
    static buildParcel = (parcelJson) => {
        const id = parcelJson._id.$oid;
        const name = parcelJson.title;
        const description = parcelJson.description;
        const risk = parcelJson.risk;
        const popularity = parcelJson.popularity;
        const investors = parcelJson.investors;
        const invested = parcelJson.investedValue;
        const categories = parcelJson.categories;

        const tokens = parcelJson.tokens.map((entry) => {
          return Token.buildToken(entry);
        });
        
        return new Parcel(id, name, tokens, description, risk, popularity, investors, invested, categories);
    }

    getTokenAddresses = () => {
        return this.tokens.map((token) => {
            return token.tokenHeader.address;
        });
    }

    getTokenWeights = () => {
        return this.tokens.map((token) => {
            return token.weight;
        });
    }

    getTokenAmounts = () => {
        return this.tokens.map((token) => {
            return MoneyFormatUtils.convertToAbsoluteValue(token.weight, token.tokenHeader.decimals);
        })
    }
}
export default Parcel;