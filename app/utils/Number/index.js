// $ID: index.js, 29 Jan 2018, 17:53, Leonid 'n3o' Knyazev $

class NumberUtils {
    /**
     * @msToTime
     */
    static msToTime(input) {
        return {
            milliseconds: parseInt((input % 1000) / 100, 10),
            seconds: parseInt((input / 1000) % 60, 10),
            minutes: parseInt((input / (1000 * 60)) % 60, 10),
            hours: parseInt(input / (1000 * 60 * 60), 10)
        }
    }
}

export default NumberUtils;
