import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: {
        provider: true,
        id: {
          [Op.not]: req.userId,
        },
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'user_avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
