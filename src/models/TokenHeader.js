class TokenHeader {
    constructor (id, name, symbol, address, decimals, logo, description, categories, webpage) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.address = address;
        this.decimals = decimals;
        this.logo = logo;
        this.decimals = decimals;
        this.description = description;
        this.categories = categories;
        this.webpage = webpage;
    }

    static buildTokenHeader = (tokenHeaderJson) => {
        const id = tokenHeaderJson._id.$oid;
        const name = tokenHeaderJson.name;
        const symbol = tokenHeaderJson.symbol;
        const address = tokenHeaderJson.address;
        const decimals = tokenHeaderJson.decimals;
        const logo = tokenHeaderJson.logo;
        const description = tokenHeaderJson.description;
        const categories = tokenHeaderJson.categories;
        const webpage = tokenHeaderJson.webpage;
        return new TokenHeader(id, name, symbol, address, decimals, logo, description, categories, webpage);
    }
}
export default TokenHeader;