import TokenHeader from "./TokenHeader";

class Token {
    constructor (id, tokenHeader, weight) {
        this.id = id;
        this.tokenHeader = tokenHeader;
        this.weight = weight;
    }

    static buildToken = (tokenJson) => {
        const tokenHeader = TokenHeader.buildTokenHeader(tokenJson.token);;
        const id = tokenJson.id.$oid;
        const weight = tokenJson.weight;
        return new Token(id, tokenHeader, weight);
    }
}
export default Token;