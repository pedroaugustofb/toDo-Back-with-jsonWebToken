import mongoose from 'mongoose';

import config from '../config/database';

class database {
    constructor(){
        this.connection = mongoose.connect(
            config.url,
            {
                useUnifiedTopology: true,

            }
        );
         
    }
}

export default new database();