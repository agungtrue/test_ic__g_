const app = require('./src/app'); // app init

// redis init
require('./src/services/redis');

// port init
const port = 5001;

// server start
app.listen(port, () => {
    console.log(`app running on port ${port}`)
});