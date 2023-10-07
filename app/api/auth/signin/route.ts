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


export  async function POST(
  req: Request,
  res: Response
) {
  const body= await req.json()
 
    const { email,  password } = body;
    const errors: string[] = [];
    

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Password is invalid",
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

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Response
        .json({ errorMessage: "Email or password is invalid" },{status:401});
    }

   

    try {
      
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return Response
          .json({ errorMessage: "Email or password is invalid" },{status:401});
      }
  
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
        data:'Error en el servidor'
      },{status:500});
    }
  
}

