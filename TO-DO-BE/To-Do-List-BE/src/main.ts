import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Activer CORS
   const express = require('express');
   const cors = require('cors');
   app.use(cors()); 

   // Autoriser les requêtes depuis localhost:4200
   app.use(cors({
     origin: 'http://localhost:4200', // Spécifie l'origine autorisée
     methods: 'GET,POST,PUT,DELETE', // Méthodes HTTP autorisées
     allowedHeaders: 'Content-Type,Authorization', // En-têtes autorisés
   }));
   
   // Autres configurations et routes
   
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors();
  
 
  
}

bootstrap();

