CREATE DATABASE  IF NOT EXISTS `bnb_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bnb_database`;
-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: localhost    Database: bnb_database
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apartments`
--

DROP TABLE IF EXISTS `apartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `rooms` tinyint NOT NULL,
  `beds` tinyint NOT NULL,
  `toilets` tinyint NOT NULL,
  `sq_meters` smallint NOT NULL,
  `address` varchar(255) NOT NULL,
  `reference_mail` varchar(45) NOT NULL,
  `apartment_images` varchar(100) NOT NULL,
  `added_services` text,
  `hearts_counter` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `owner_id_fk_idx` (`owner_id`),
  CONSTRAINT `owner_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartments`
--

LOCK TABLES `apartments` WRITE;
/*!40000 ALTER TABLE `apartments` DISABLE KEYS */;
INSERT INTO `apartments` VALUES (1,2,'Appartamento moderno',3,5,2,120,'Via Roma, 10, Milano','email@example.com','img1.jpg','WiFi, Piscina',10),(2,1,'Appartamento spazioso con vista mare',3,4,2,120,'Via Roma, 10, Napoli','info@napoliview.com','napoli1.jpg','WiFi, Aria condizionata, Parcheggio',0),(3,3,'Monolocale moderno in centro città',1,1,1,40,'Corso Vittorio Emanuele, 25, Milano','contact@milanoapartments.com','milano1.jpg','WiFi, Ascensore',0),(4,2,'Villa con piscina e giardino privato',5,8,3,250,'Via delle Rose, 15, Firenze','luxury@firenzevilla.com','firenze1.jpg','Piscina, Parcheggio, Giardino, WiFi',0),(5,1,'Appartamento economico vicino alla stazione',2,3,1,60,'Piazza Garibaldi, 2, Bologna','bologna@cheapstay.com','bologna1.jpg','WiFi',0),(6,1,'Loft esclusivo con design moderno',2,2,2,80,'Via della Moda, 7, Torino','torinolux@loft.com','torino1.jpg','WiFi, Smart TV, Aria condizionata',0);
/*!40000 ALTER TABLE `apartments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'Gianni','Rossi','gianni@gmail.com','3317843847'),(2,'Luca','Rossi','luca.rossi@example.com','3331234567'),(3,'Giulia','Bianchi','giulia.bianchi@example.com','3347654321'),(4,'Marco','Verdi','marco.verdi@example.com','3359876543'),(5,'Sara','Neri','sara.neri@example.com','3365678901'),(6,'Federico','Gialli','federico.gialli@example.com','3378765432');
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_apartment_fk` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `text` varchar(250) NOT NULL,
  `data` date NOT NULL,
  `days_of_stay` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_apartment_fk` (`id_apartment_fk`),
  CONSTRAINT `id_apartment_fk` FOREIGN KEY (`id_apartment_fk`) REFERENCES `apartments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,'Marco Rossi','Appartamento confortevole e ben arredato. Tutto pulito e organizzato.','2024-12-20',3),(2,2,'Giulia Bianchi','La posizione è perfetta per visitare la città, ma il bagno era un po\' piccolo.','2025-01-05',5),(3,3,'Luca Verdi','Host molto gentile e disponibile. Cucina ben attrezzata, consigliatissimo!','2024-11-15',7),(4,4,'Francesca Neri','Ottimo rapporto qualità-prezzo. La vista dal balcone era spettacolare!','2025-01-02',4),(5,5,'Alessandro Conti','Zona tranquilla e silenziosa. Ideale per rilassarsi dopo una giornata impegnativa.','2024-10-10',2),(6,1,'Sara Moretti','Letto molto comodo, ma la connessione Wi-Fi era un po\' lenta.','2024-09-18',6),(7,2,'Giorgio Esposito','Mi sono trovato benissimo! L\'appartamento è spazioso e moderno.','2024-11-30',8),(8,3,'Chiara Galli','Arredamento un po\' datato, ma pulito e funzionale.','2025-01-03',5),(9,4,'Marta Ferri','La piscina era fantastica! Ideale per una vacanza estiva.','2024-08-20',3),(10,5,'Davide Marchetti','Tutto perfetto, dalla posizione ai servizi. Tornerò sicuramente!','2025-01-06',7);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-10  9:46:03
