"use server";

import { auth } from "~/auth";
import { db } from "~/server/db";
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  //   const { getUser } = getKindeServerSession()
  //   const user = await getUser()
  const session = await auth();
  const user = session?.user;
  console.log(user);
  if (!user?.id || !user.email) {
    throw new Error("You need to be logged in to view this page.");
  }

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  if (!order) throw new Error("This order does not exist.");
  order.isPaid = true;
  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
