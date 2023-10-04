const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";
import { StatusCodes } from "http-status-codes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST")
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: "Method not allowed" });
  else if (req.method === "POST") {
    // https://stripe.com/docs/payments/checkout/how-checkout-works
    const YOUR_DOMAIN = "http://localhost:3000";

    try {
      // Create Checkout Sessions from body params.
      const { userId } = req.body;
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.line_items,

        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
        // The list of payment method types that customers can use. Possible enum values [ card ... ]
        payment_method_types: ["card"],
      });
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user) {
        await prisma.verification.create({
          data: {
            userId: userId as string,
            email: user.email,
            name: user.name!,
          },
        });
      }

      res.status(StatusCodes.OK).json(session);
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
  }
}
