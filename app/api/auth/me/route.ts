import { headers } from 'next/headers'

import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export  async function GET() {
 
  const bearerToken = headers().get('authorization') as string;
  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return Response.json({
      errorMessage: "Unauthorized request",
    },{status:401});
  }

  try {
    
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        city: true,
        phone: true,
      },
    });
  
    if (!user) {
      return Response.json({
        errorMessage: "User not found",
      },{status:401});
    }
  
    return Response.json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      city: user.city,
    });
  } catch (error) {
    console.log(error)
    return Response.json({
      errorMessage: "Server Error",
    },{status:500});
  }
}
