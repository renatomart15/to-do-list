import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return res.status(409).send("Email já está cadastrado");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email: email, password: hashedPassword },
    });
    res
      .status(201)
      .json({ message: "Usuário criato com sucesso", user: newUser });
  } catch (error) {
    res.status(500).send("Erro no servidor ao cadastrar usuário");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    
    if (!user) {
      return res.status(401).send("Email ou senha incorretos");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Email ou senha incorretos");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    return res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).send("Erro no servidor ao cadastrar usuário");
  }
};
