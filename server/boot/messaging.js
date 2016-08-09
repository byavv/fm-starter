const rabbit = require('wascally')
    , debug = require("debug")("starter");

module.exports = function (app, done) {
   
    function handle() {
        rabbit.handle('starter.someaction', (message) => {
            debug("someaction", message.body)
            message.ack();
            // message.reject()
        });


        rabbit.handle('starter.somerequest', (message) => {
            debug(`somerequest`)
            //  if (err) {
            //      message.nack();
            //  } else {
            message.reply(info);
            //  }
        });
    }

    if (process.env.NODE_ENV != 'test')
        require('../lib/topology')(rabbit, {
            name: app.get('ms_name'),
            host: app.get("rabbit_host")
        })
            .then(handle)
            .then(() => {
                app.rabbit = rabbit;
                debug("Rabbit client started");
            })
            .then(done);
    
}