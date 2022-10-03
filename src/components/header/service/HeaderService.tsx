import Api from "../../../services/Api"


class HeaderService {
    static getMenu() {
        return Api.get(`Menu`)
    }

}

export default HeaderService