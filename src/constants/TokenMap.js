export const tokenList = [
    "BTC", "LINK", "BAT"
];

export const getInitialTokenMap = () => {
    let tokenMap = {};
    for(let i=0; i<tokenList.length; i++) {
        tokenMap[tokenList[i]] = 0;
    }
    return tokenMap;
}