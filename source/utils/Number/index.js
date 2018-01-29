// $ID: index.js, 29 Jan 2018, 17:53, Leonid 'n3o' Knyazev $

class NumberUtils {
    /**
     * @msToTime
     */
    static msToTime(input) {
        return {
            milliseconds: parseInt((input % 1000) / 100),
            seconds: parseInt((input / 1000) % 60),
            minutes: parseInt((input / (1000 * 60)) % 60),
            hours: parseInt(input / (1000 * 60 * 60))
        }
    }
}

export default NumberUtils;
