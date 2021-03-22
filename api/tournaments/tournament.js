const MongoDB = require('../../config/mongo');

class Tournament {
  async get() {
    await MongoDB.connect();
    const tournaments = await MongoDB.db
      .collection('Tournaments')
      .aggregate([
        {
          $lookup: {
            from: 'Participants',
            localField: 'participantsid',
            foreignField: '_id',
            as: 'participants',
          },
        },
        {
          $match: {
            status: true,
          },
        },
      ])
      // .find({ status: true })
      .project({
        name: 1,
        description: 1,
        status: 1,
        participants: {
          name: 1,
          username: 1,
        },
      })
      .toArray();

    return tournaments;
  }

  async getByNameOrDescription(nameOrDescription) {
    await MongoDB.connect();
    const tournaments = await MongoDB.db
      .collection('Tournaments')
      .find({
        $or: [
          { name: { $regex: `.*${nameOrDescription}.*` } },
          {
            description: { $regex: `.*${nameOrDescription}.*` },
          },
        ],
      })

      .toArray();
    return tournaments;
  }
}

module.exports = Tournament;
