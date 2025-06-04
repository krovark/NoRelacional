// services/neo4j.service.js
const neo4j = require('neo4j-driver');
const { getDriver } = require('../database/neo');

exports.createUserNode = async (userId) => {
  const driver = getDriver();
  if (!driver) throw new Error('Neo4j driver aún no inicializado');

  const session = driver.session({ defaultAccessMode: neo4j.session.WRITE });
  try {
    await session.run(
      'MERGE (u:User {id: $userId})',
      { userId }
    );
  } finally {
    await session.close();
  }
};

exports.followUser = async (fromId, toId) => {
  const driver = getDriver();
  if (!driver) throw new Error('Neo4j driver aún no inicializado');

  const session = driver.session({ defaultAccessMode: neo4j.session.WRITE });
  try {
    await session.run(
      `
      MATCH (a:User {id: $fromId}), (b:User {id: $toId})
      MERGE (a)-[:FOLLOWS]->(b)
      `,
      { fromId, toId }
    );
  } finally {
    await session.close();
  }
};

exports.unfollowUser = async (fromId, toId) => {
  const driver = getDriver();
  if (!driver) throw new Error('Neo4j driver aún no inicializado');

  // Abrimos sesión en modo WRITE para eliminar la relación
  const session = driver.session({ defaultAccessMode: neo4j.session.WRITE });
  try {
    await session.run(
      `
      MATCH (a:User {id: $fromId})-[r:FOLLOWS]->(b:User {id: $toId})
      DELETE r
      `,
      { fromId, toId }
    );
  } finally {
    await session.close();
  }
};


exports.getFollowers = async (userId) => {
  const driver = getDriver();
  if (!driver) throw new Error('Neo4j driver aún no inicializado');

  const session = driver.session({ defaultAccessMode: neo4j.session.READ });
  try {
    const result = await session.run(
      `
      MATCH (f:User)-[:FOLLOWS]->(u:User {id: $userId})
      RETURN f.id AS id
      `,
      { userId }
    );
    // Extraer solo el array de IDs
    return result.records.map(record => record.get('id'));
  } finally {
    await session.close();
  }
};


exports.getFollowing = async (userId) => {
  const driver = getDriver();
  if (!driver) throw new Error('Neo4j driver aún no inicializado');

  const session = driver.session({ defaultAccessMode: neo4j.session.READ });
  try {
    const result = await session.run(
      `
      MATCH (u:User {id: $userId})-[:FOLLOWS]->(f:User)
      RETURN f.id AS id
      `,
      { userId }
    );
    return result.records.map(record => record.get('id'));
  } finally {
    await session.close();
  }
};