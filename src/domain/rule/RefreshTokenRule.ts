import DateTimeUtil from "../../util/date-time/dateTimeUtil";

export default class RefreshTokenRule {
    static defatulExpirationTime() {
        return DateTimeUtil.nowSummingHours(4);
    }
}
