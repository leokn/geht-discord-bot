// $ID: index.js, 29 Jan 2018, 17:53, Leonid 'n3o' Knyazev $

class NumberUtils {
    static msToTime(input) {
        return {
            days: parseInt(input / (1000 * 60 * 60 * 24), 10),
            hours: parseInt(input / (1000 * 60 * 60), 10),
            minutes: parseInt((input / (1000 * 60)) % 60, 10),
            seconds: parseInt((input / 1000) % 60, 10),
            milliseconds: parseInt((input % 1000) / 100, 10)
        }
    }

    static isEven(input) {
        return input % 2 === 0;
    }
}

export default NumberUtils;
