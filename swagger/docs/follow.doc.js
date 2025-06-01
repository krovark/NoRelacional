/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Endpoints para seguir usuarios
 */

/**
 * @swagger
 * /follow/{id}:
 *   post:
 *     summary: Seguir a otro usuario
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a seguir
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ahora seguís a ese usuario
 *       400:
 *         description: No podés seguirte a vos mismo
 *       500:
 *         description: Error interno
 */
