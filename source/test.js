// $ID: test.js, 26 Jan 2018, 17:51, Leonid 'n3o' Knyazev $

import { Service } from './base';

class Test extends Service {
    /**
     * @override
     */
    constructor(name, timeout) {
        super(name, timeout);
    }
}

export default Test;
