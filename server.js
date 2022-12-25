const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 3000 } = process.env;

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(app.listen(PORT, () => console.log(`Server running. Use our API on port: ${PORT}`)))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
