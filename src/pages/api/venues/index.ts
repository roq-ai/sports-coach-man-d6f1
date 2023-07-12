import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { venueValidationSchema } from 'validationSchema/venues';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getVenues();
    case 'POST':
      return createVenue();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVenues() {
    const data = await prisma.venue
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'venue'));
    return res.status(200).json(data);
  }

  async function createVenue() {
    await venueValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.training_day?.length > 0) {
      const create_training_day = body.training_day;
      body.training_day = {
        create: create_training_day,
      };
    } else {
      delete body.training_day;
    }
    const data = await prisma.venue.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
