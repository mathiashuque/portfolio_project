import jsLogo from "../assets/logos/javascript.logo.svg";
import tsLogo from "../assets/logos/typescript.logo.svg";
import htmlLogo from "../assets/logos/html5.logo.svg";
import cssLogo from "../assets/logos/css.logo.svg";
import tailwindLogo from "../assets/logos/tailwindcss.logo.svg";
import reactLogo from "../assets/logos/react.logo.svg";
import nextjsLogo from "../assets/logos/nextjs.logo.svg";
import angularLogo from "../assets/logos/angular.logo.gif";
import nodeLogo from "../assets/logos/nodejs.logo.svg";
import expressLogo from "../assets/logos/expressjs.logo.svg";
import shopifyLogo from "../assets/logos/shopify.logo.svg";
import dotnetLogo from "../assets/logos/dotnet.logo.svg";
import dockerLogo from "../assets/logos/docker.logo.svg";
import postmanLogo from "../assets/logos/postman.logo.svg";
import figmaLogo from "../assets/logos/figma.logo.svg";
import gitLogo from "../assets/logos/git.logo.svg";
import awsLogo from "../assets/logos/aws.logo.svg";
import githubLogo from "../assets/logos/github.logo.svg";
import linuxLogo from "../assets/logos/linux.logo.svg";
import reactNativeLogo from "../assets/logos/reactnative.logo.svg";
import vercelLogo from "../assets/logos/vercel.logo.svg";
import firebaseLogo from "../assets/logos/firebase.logo.svg";
import pythonLogo from "../assets/logos/python.logo.svg";
import javaLogo from "../assets/logos/java.logo.svg";
import cplusplusLogo from "../assets/logos/cplusplus.logo.svg";
import csharpLogo from "../assets/logos/csharp.logo.svg";
import haskellLogo from "../assets/logos/haskell.logo.svg";
import flutterLogo from "../assets/logos/flutter.logo.svg";
import sequelizeLogo from "../assets/logos/sequelize.logo.svg";
import nestjsLogo from "../assets/logos/nestjs.logo.svg";
import prismaLogo from "../assets/logos/prisma.logo.svg";
import efcoreLogo from "../assets/logos/efcore.logo.svg";
import mongooseLogo from "../assets/logos/mongoose.logo.svg";
import jestLogo from "../assets/logos/jest.logo.svg";
import jasmineLogo from "../assets/logos/jasmine.logo.svg";
import cucumberLogo from "../assets/logos/cucumber.logo.svg";
import cypressLogo from "../assets/logos/cypress.logo.svg";
import mysqlLogo from "../assets/logos/mysql.logo.svg";
import postgresqlLogo from "../assets/logos/postgresql.logo.svg";
import mongodbLogo from "../assets/logos/mongodb.logo.svg";
import sqlserverLogo from "../assets/logos/sqlserver.logo.svg";
import type { TechColor } from "../theme/tech/types";


export type StackItem = {
  name: string;
  logo: string;
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
