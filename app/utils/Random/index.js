// $ID: index.js, 30 Jan 2018, 19:02, Leonid 'n3o' Knyazev $

class Random {
    /**
     * @nextInt
     */
    static nextInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    /**
     * @nextFloat
     */
    static nextFloat(min, max) {
        return this.nextInt(min * 100, (max * 100) + 1) / 100;
    }


    /**
     * @roll
     */
    static roll(max = 100) {
        return this.nextFloat(0, max);
    }


    /**
     * @arrayElement
     */
    static arrayElement(array) {
        return array[this.nextInt(0, array.length)];
    }
}

export default Random;
