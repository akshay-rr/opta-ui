class ParcelEstimateException {
    constructor (value) {
        this.value = value;
    }
    toString = () => {
        return "ParcelEstimateException: %s" % this.value;
    }
}
export default ParcelEstimateException;