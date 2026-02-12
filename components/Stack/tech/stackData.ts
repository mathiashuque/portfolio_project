import jsLogo from "../../../public/logos/javascript.logo.svg";
import tsLogo from "../../../public/logos/typescript.logo.svg";
import htmlLogo from "../../../public/logos/html5.logo.svg";
import cssLogo from "../../../public/logos/css.logo.svg";
import tailwindLogo from "../../../public/logos/tailwindcss.logo.svg";
import reactLogo from "../../../public/logos/react.logo.svg";
import nextjsLogo from "../../../public/logos/nextjs.logo.svg";
import angularLogo from "../../../public/logos/angular.logo.svg";
import nodeLogo from "../../../public/logos/nodejs.logo.svg";
import expressLogo from "../../../public/logos/expressjs.logo.svg";
import shopifyLogo from "../../../public/logos/shopify.logo.svg";
import dotnetLogo from "../../../public/logos/dotnet.logo.svg";
import dockerLogo from "../../../public/logos/docker.logo.svg";
import postmanLogo from "../../../public/logos/postman.logo.svg";
import figmaLogo from "../../../public/logos/figma.logo.svg";
import gitLogo from "../../../public/logos/git.logo.svg";
import awsLogo from "../../../public/logos/aws.logo.svg";
import githubLogo from "../../../public/logos/github.logo.svg";
import linuxLogo from "../../../public/logos/linux.logo.svg";
import reactNativeLogo from "../../../public/logos/reactnative.logo.svg";
import vercelLogo from "../../../public/logos/vercel.logo.svg";
import firebaseLogo from "../../../public/logos/firebase.logo.svg";
import pythonLogo from "../../../public/logos/python.logo.svg";
import javaLogo from "../../../public/logos/java.logo.svg";
import cplusplusLogo from "../../../public/logos/cplusplus.logo.svg";
import csharpLogo from "../../../public/logos/csharp.logo.svg";
import haskellLogo from "../../../public/logos/haskell.logo.svg";
import flutterLogo from "../../../public/logos/flutter.logo.svg";
import sequelizeLogo from "../../../public/logos/sequelize.logo.svg";
import nestjsLogo from "../../../public/logos/nestjs.logo.svg";
import prismaLogo from "../../../public/logos/prisma.logo.svg";
import efcoreLogo from "../../../public/logos/efcore.logo.svg";
import mongooseLogo from "../../../public/logos/mongoose.logo.svg";
import jestLogo from "../../../public/logos/jest.logo.svg";
import jasmineLogo from "../../../public/logos/jasmine.logo.svg";
import cucumberLogo from "../../../public/logos/cucumber.logo.svg";
import cypressLogo from "../../../public/logos/cypress.logo.svg";
import mysqlLogo from "../../../public/logos/mysql.logo.svg";
import postgresqlLogo from "../../../public/logos/postgresql.logo.svg";
import mongodbLogo from "../../../public/logos/mongodb.logo.svg";
import sqlserverLogo from "../../../public/logos/sqlserver.logo.svg";
import type { StaticImageData } from "next/image";
import { TechColor } from "./types";


export type StackItem = {
  name: string;
  logo: StaticImageData;
  color: TechColor;
};

export const STACK = {
  "Programming Languages": [
    { name: "HTML5", logo: htmlLogo, color: "html" },
    { name: "CSS3", logo: cssLogo, color: "css" },
    { name: "JavaScript", logo: jsLogo, color: "js" },
    { name: "TypeScript", logo: tsLogo, color: "ts" },
    { name: "Python", logo: pythonLogo, color: "python" },
    { name: "Java", logo: javaLogo, color: "java" },
    { name: "C++", logo: cplusplusLogo, color: "cplusplus" },
    { name: "C#", logo: csharpLogo, color: "csharp" },
    { name: ".NET", logo: dotnetLogo, color: "dotnet" },
    { name: "Haskell", logo: haskellLogo, color: "haskell" },
  ],

  "Libraries & Frameworks": [
    { name: "React", logo: reactLogo, color: "react" },
    { name: "Angular", logo: angularLogo, color: "angular" },
    { name: "React Native", logo: reactNativeLogo, color: "react" },
    { name: "Flutter", logo: flutterLogo, color: "flutter" },

    { name: "Tailwind CSS", logo: tailwindLogo, color: "tailwind" },

    { name: "Express.js", logo: expressLogo, color: "express" },
    { name: "Nest.js", logo: nestjsLogo, color: "nestjs" },
    { name: "Next.js", logo: nextjsLogo, color: "nextjs" },

    { name: "Sequelize", logo: sequelizeLogo, color: "sequelize" },
    { name: "Prisma", logo: prismaLogo, color: "prisma" },
    { name: "EF Core", logo: efcoreLogo, color: "efcore" },
    { name: "Mongoose", logo: mongooseLogo, color: "mongoose" },
    { name: "Jest", logo: jestLogo, color: "jest" },
    { name: "Jasmine", logo: jasmineLogo, color: "jasmine" },
    { name: "Cucumber", logo: cucumberLogo, color: "cucumber" },
    { name: "Cypress", logo: cypressLogo, color: "cypress" },
  ],

  "Tools & Platforms": [
    { name: "Node.js", logo: nodeLogo, color: "node" },
    { name: "Shopify", logo: shopifyLogo, color: "shopify" },
    { name: "Docker", logo: dockerLogo, color: "docker" },
    { name: "Postman", logo: postmanLogo, color: "postman" },
    { name: "Figma", logo: figmaLogo, color: "figma" },
    { name: "Git", logo: gitLogo, color: "git" },
    { name: "GitHub", logo: githubLogo, color: "github" },
    { name: "AWS", logo: awsLogo, color: "aws" },
    { name: "Linux", logo: linuxLogo, color: "linux" },
    { name: "Vercel", logo: vercelLogo, color: "vercel" },
    { name: "Firebase", logo: firebaseLogo, color: "firebase" },
    { name: "MySQL", logo: mysqlLogo, color: "mysql" },
    { name: "PostgreSQL", logo: postgresqlLogo, color: "postgresql" },
    { name: "MongoDB", logo: mongodbLogo, color: "mongodb" },
    { name: "SQL Server", logo: sqlserverLogo, color: "sql server" },


  ],
} as const satisfies Record<string, readonly StackItem[]>;

export type StackCategory = keyof typeof STACK;
