import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return res.status(409).send("Email já está cadastrado");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email: email, password: hashedPassword, name },
    });
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" },
    );

    res.status(201).json({ message: "Usuário criado com sucesso", token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro no servidor ao cadastrar usuário");
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("chegou no login", req.body);
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

    if (!user.password) {
      return res.status(401).send("Email ou senha incorretos");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Email ou senha incorretos");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" },
    );
    return res.status(200).json({ token: token });
  } catch (error) {
    console.log("ERRO:", JSON.stringify(error));
    console.log("ERRO mensagem:", (error as Error).message);
    res.status(500).send("Erro no servidor");
  }
};
