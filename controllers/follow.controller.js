const neo4jService = require('../services/neo4j.service');

exports.followUser = async (req, res) => {
  const fromId = req.userId;          // viene del middleware
  const toId = req.params.id;

  if (fromId === toId) {
    return res.status(400).json({ error: 'No podés seguirte a vos mismo.' });
  }

  
  console.log('→ Llega a followController:', { fromId, toId });

  try {
    await neo4jService.createUserNode(fromId);
    await neo4jService.createUserNode(toId);
    await neo4jService.followUser(fromId, toId);

    console.log('→ Follow OK para:', { fromId, toId });
    res.json({ message: `Ahora seguís al usuario ${toId}` });
  } catch (err) {
    console.error('→ Error en followController:', err, { fromId, toId });
    res.status(500).json({ error: 'No se pudo seguir al usuario' });
  }
};

exports.unfollowUser = async (req, res) => {
  const fromId = req.userId;      // viene del middleware
  const toId = req.params.id;

  if (fromId === toId) {
    return res.status(400).json({ error: 'No podés dejar de seguirte a vos mismo.' });
  }

  console.log('→ Llega a unfollowController:', { fromId, toId });

  try {
    
    await neo4jService.unfollowUser(fromId, toId);

    console.log('→ Unfollow exitoso:', { fromId, toId });
    return res.json({ message: `Dejaste de seguir al usuario ${toId}` });
  } catch (err) {
    console.error('→ Error en unfollowController:', err, { fromId, toId });
    return res.status(500).json({ error: 'No se pudo dejar de seguir al usuario' });
  }
};


exports.getFollowers = async (req, res) => {
  const userId = req.userId;

  try {
    const followersList = await neo4jService.getFollowers(userId);
    return res.json({ userId, followers: followersList });
  } catch (err) {
    console.error('Error en getFollowers:', err);
    return res.status(500).json({ error: 'No se pudo obtener la lista de seguidores' });
  }
};

exports.getFollowing = async (req, res) => {
  const userId = req.userId;

  try {
    const followingList = await neo4jService.getFollowing(userId);
    return res.json({ userId, following: followingList });
  } catch (err) {
    console.error('Error en getFollowing:', err);
    return res.status(500).json({ error: 'No se pudo obtener la lista de seguidos' });
  }
};