import Constants from '../constants/Constants';
import Parcel from "../models/Parcel";

class ParcelDao {
    static getParcels = async () => {
        const response = await fetch(Constants.BACKEND_URL, {
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

    static convertToParcelList = (parcelJsonList) => {
        let parcelList = [];
        for (var i = 0; i < parcelJsonList.length; i++) {
            parcelList.push(Parcel.buildParcel(parcelJsonList[i]));
        }
        return parcelList;
    }
}
export default ParcelDao;