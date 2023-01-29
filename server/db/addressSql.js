module.exports = {
    insertAddress(params) {
        const { uid, name, tel, province, city, county, country, addressDetail, isDefault, areaCode } = params;
        return `insert into address(uid, name, tel, city, province, county, country, addressDetail, isDefault, areaCode) values(${uid}, '${name}', '${tel}', '${city}', '${province}', '${county}', '${country}', '${addressDetail}', '${isDefault}', '${areaCode}')`;
    },
    selectAddress(params) {
        const { uid } = params;
        return `select * from address where uid=${uid}`;
    },
    selectDefaultList(params) {
        const { uid } = params;
        return `select * from address where uid=${uid} and isDefault='1'`;
    },
    updateDefault(params) {
        const { uid } = params;
        return `update address set isDefault=replace(isDefault, '1', '0') where uid=${uid}`;
    }
}