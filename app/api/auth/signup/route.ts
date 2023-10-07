import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

interface Body {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export  async function GET(){
  return Response.json({ data:'hello' })
}

export  async function POST(
  req: Request,
  res: Response
) {
  const body= await req.json()
 
    const { firstName, lastName, email, phone, city, password } = body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is invalid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not strong enough",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return Response.json({ errorMessage: errors[0]},{status:400});
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      return Response
        .json(
          {errorMessage: "Email is associated with another account" },{status:400}
          );
    }

    try {
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          password: hashedPassword,
          city,
          phone,
          email,
        },
      });
  
      const alg = "HS256";
  
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  
      const token = await new jose.SignJWT({ email: user.email })
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .sign(secret);
  
      // setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });
  
      return Response.json({
        token,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
      },{status:200});
    } catch (error) {
      console.log(error)
      return Response.json({
        data:'Error al crear Usuario'
      },{status:500});
    }
  

}
