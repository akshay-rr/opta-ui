import Constants from '../constants/Constants';

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
        return data[0].baskets;
    };
}
export default ParcelDao;