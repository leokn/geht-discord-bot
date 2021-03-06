// $ID: index.js, 29 Jan 2018, 17:59, Leonid 'n3o' Knyazev $

class StringUtils {
    static upperFirstChar(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    static isNullOrWhiteSpace(input) {
        return !input || input.replace(/\s/g, '').length === 0;
    }
}

export default StringUtils;
