const neo4j = require('neo4j-driver');
require('dotenv').config();

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

let driver;

const connectNeo4j = () => {
  driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  driver.verifyConnectivity()
    .then(() => console.log('✅ Conectado a Neo4j'))
    .catch((err) => console.error('❌ Error al conectar a Neo4j:', err));
};

module.exports = {
  connectNeo4j,
  getDriver: () => driver
};