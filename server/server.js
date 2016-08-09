'use strtict';
const boot = require('loopback-boot')
    , http = require('http')
    , loopback = require('loopback')
    , app = module.exports = loopback()
    , debug = require('debug')('starter');

const host = process.env.HTTP_HOST || '0.0.0.0',
    http_port = process.env.HTTP_PORT || 3009,
    etcd_host = process.env.ETCD_HOST || 'localhost',
    rabbit_host = process.env.BROCKER_HOST || 'localhost';

if (!process.env.HTTP_HOST) { process.emitWarning('HTTP_HOST environment is not set, use default (localhost)'); }
if (!process.env.ETCD_HOST) { process.emitWarning('ETCD_HOST environment is not set, use default (localhost)'); }
if (!process.env.BROCKER_HOST) { process.emitWarning('BROCKER_HOST environment is not set, use default (localhost)'); }

app.set('http_port', http_port);
app.set('etcd_host', etcd_host);
app.set('rabbit_host', rabbit_host);
app.set('ms_name', 'starter');

boot(app, __dirname, (err) => {
    if (err) throw err;
    app.start = function () {
        const httpServer = http.createServer(app).listen(http_port, () => {
            app.emit('started');
            app.close = (done) => {
                debug('Exiting...');
                app.removeAllListeners('started');
                app.removeAllListeners('loaded');
                if (app.rabbit) {
                    app.rabbit.closeAll();
                }
                httpServer.close(() => {
                    process.exit(0);
                });
            };
        });
        process.on('SIGINT', function () {
            app.close();
        });
    };
    if (require.main === module)
        app.start();
    app.loaded = true;
    app.emit('loaded');
});
