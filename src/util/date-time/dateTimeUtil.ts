export default class DateTimeUtil {
    static nowSummingHours(hours: number): Date {
        const now = new Date();
        return new Date(now.getTime() + hours * 3600 * 1000);
    }
}
