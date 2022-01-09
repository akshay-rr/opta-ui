import Constants from '../constants/Constants';
import Parcel from "../models/Parcel";

class ParcelDao {
    static getParcels = async () => {
        const response = await fetch(Constants.BASKET_URL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        });
        const data = await response.json();
        return this.convertToParcelList(data);
    };

    static getParcelById = async (id) => {
        const response = await fetch(Constants.BASKET_BY_ID + id, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        });
        const data = await response.json();
        return Parcel.buildParcel(data[0]);
    }

    static getUser = async (walletAddress) => {
        const response = await fetch(Constants.GET_USER_BY_WALLET + walletAddress, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        });
        const data = await response.json();
        return data;
    }

    static createUser = async (user) => {
        const response = await fetch(Constants.USERS_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                emailID: user.email,
                walletAddress: user.walletAddress
            })
        });
        const data = await response.json();
        return data;
    }

    static addTransaction = async (transactionHash, userID, basketID, purchaseValue, numberOfUnits) => {
        const response = await fetch(Constants.TRANSACTIONS_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: userID,
                basketID: basketID,
                purchaseValue: purchaseValue,
                numberOfUnits: numberOfUnits,
                transactionHash: transactionHash
            })
        });
        const data = await response.json();
        return data;
    }

    static getBasketPriceHistory = async (basketId) => {
        const response = await fetch(Constants.FETCH_BASKET_PRICE_HISTORY + basketId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        });
        const data = await response.json();
        return data;
    }

    static convertToParcelList = (parcelJsonList) => {
        let parcelList = [];
        for (var i = 0; i < parcelJsonList.length; i++) {
            parcelList.push(Parcel.buildParcel(parcelJsonList[i]));
        }
        return parcelList;
    }
}
export default ParcelDao;