module.exports = {
    insertAddress(params) {
        const { uid, name, tel, province, city, county, country, addressDetail, isDefault, areaCode } = params;
        return `insert into address(uid, name, tel, city, province, county, country, address_detail, is_default, area_code) values(${uid}, '${name}', '${tel}', '${city}', '${province}', '${county}', '${country}', '${addressDetail}', '${isDefault}', '${areaCode}')`;
    },
    updateAddress(params) {
        const { id, name, tel, province, city, county, country, addressDetail, isDefault, areaCode } = params;
        return `update address set name='${name}', tel='${tel}', city='${city}', province='${province}', county='${county}', address_detail='${addressDetail}', is_default='${isDefault}', area_code='${areaCode}' where id=${id}`;
    },
    selectAddress(params) {
        const { uid } = params;
        return `select * from address where uid=${uid}`;
    },
    selectDefaultList(params) {
        const { uid } = params;
        return `select * from address where uid=${uid} and is_default='1'`;
    },
    updateDefault(params) {
        const { uid } = params;
        return `update address set is_default=replace(is_default, '1', '0') where uid=${uid}`;
    },
    deleteAddress(params) {
        const { id } = params;
        return `delete from address where id=${id}`;
    }
}