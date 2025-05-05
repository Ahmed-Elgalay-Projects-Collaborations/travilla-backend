const app = require('./app');

const PORT = process.env.APP_PORT || 5000;

app.listen(process.env.APP_PORT, () => {
  console.log(`🚀 Server running on port ${process.env.APP_PORT}`);
});