import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { venueValidationSchema } from 'validationSchema/venues';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.venue
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVenueById();
    case 'PUT':
      return updateVenueById();
    case 'DELETE':
      return deleteVenueById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVenueById() {
    const data = await prisma.venue.findFirst(convertQueryToPrismaUtil(req.query, 'venue'));
    return res.status(200).json(data);
  }

  async function updateVenueById() {
    await venueValidationSchema.validate(req.body);
    const data = await prisma.venue.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVenueById() {
    const data = await prisma.venue.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
