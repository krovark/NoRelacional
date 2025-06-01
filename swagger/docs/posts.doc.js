/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints de publicaciones
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear una publicación
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publicación creada
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 */

/**
 * @swagger
 * /posts/mine:
 *   get:
 *     summary: Obtener publicaciones propias del usuario logueado
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de publicaciones propias
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar una publicación propia
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación eliminada
 *       403:
 *         description: No autorizado o no encontrado
 */
