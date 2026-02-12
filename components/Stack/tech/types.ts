export type TechColor =
  | "html"
  | "css"
  | "js"
  | "ts"
  | "tailwind"
  | "react"
  | "angular"
  | "nextjs"
  | "node"
  | "express"
  | "shopify"
  | "docker"
  | "dotnet"
  | "python"
  | "postman"
  | "figma"
  | "git"
  | "aws"
  | "java"
  | "linux"
  | "vercel"
  | "firebase"
  | "cplusplus"
  | "csharp"
  | "haskell"
  | "github"
  | "sequelize"
  | "flutter"
  | "nestjs"
  | "efcore"
  | "mongoose"
  | "jest"
  | "jasmine"
  | "cucumber"
  | "cypress"
  | "mysql"
  | "postgresql"
  | "mongodb"
  | "sql server"
  | "prisma";

export type PaletteEntry = {
  text: string;
  border: string;
  rgb: string;

  tileIdleBgA: number;
  innerIdleA: number;
  innerHoverA: number;
  outerHoverA1: number;
  outerHoverA2: number;
  hoverBorderA: number;
};
