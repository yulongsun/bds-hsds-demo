import 'mocha';
import * as should from 'should'

import list = require('../commands/list');

describe('commands', () => {

    //dataserver 服务器增加，
    it('list', async function () {
        let ret = await list();

        should(ret).be.Array()

    })

})



