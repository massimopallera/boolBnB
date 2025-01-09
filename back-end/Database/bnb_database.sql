
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

-- Table structure for table `apartment_review`
--

DROP TABLE IF EXISTS `apartment_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `apartment_id_fk` FOREIGN KEY (`id`) REFERENCES `apartments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_id_fk` FOREIGN KEY (`id`) REFERENCES `reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

-- Table structure for table `appartamenti`
--

DROP TABLE IF EXISTS `appartamenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appartamenti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descrizione_breve` varchar(255) NOT NULL,
  `nr_stanze` tinyint NOT NULL,
  `nr_letti` tinyint NOT NULL,
  `nr_bagni` tinyint NOT NULL,
  `mt_quadri` smallint NOT NULL,
  `indirizzo_completo` varchar(255) NOT NULL,
  `email_riferimento` varchar(45) NOT NULL,
  `img_appartamento` varchar(100) NOT NULL,
  `servizi_aggiuntivi` text,
  `counter_cuori` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_proprietario_fk` FOREIGN KEY (`id`) REFERENCES `proprietari` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--

-- Dumping data for table `apartment_review`
--

LOCK TABLES `apartment_review` WRITE;
/*!40000 ALTER TABLE `apartment_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `apartment_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartments`
--

DROP TABLE IF EXISTS `apartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `rooms` tinyint NOT NULL,
  `beds` tinyint NOT NULL,
  `toilets` tinyint NOT NULL,
  `sq_meters` smallint NOT NULL,
  `address` varchar(255) NOT NULL,
  `reference_mail` varchar(45) NOT NULL,
  `apartment_images` varchar(100) NOT NULL,
  `added_services` text,
  `hearts_container` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `owner_id_fk` FOREIGN KEY (`id`) REFERENCES `owners` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartments`
--

LOCK TABLES `apartments` WRITE;
/*!40000 ALTER TABLE `apartments` DISABLE KEYS */;
INSERT INTO `apartments` VALUES (1,'Appartamento moderno',3,5,2,120,'Via Roma, 10, Milano','email@example.com','img1.jpg','WiFi, Piscina',10);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'Gianni','Rossi','gianni@gmail.com','2120');
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
  `name` varchar(50) NOT NULL,
  `text` varchar(250) NOT NULL,
  `data` date NOT NULL,
  `days of stay` tinyint NOT NULL,

-- Dumping data for table `appartamenti`
--

LOCK TABLES `appartamenti` WRITE;
/*!40000 ALTER TABLE `appartamenti` DISABLE KEYS */;
/*!40000 ALTER TABLE `appartamenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appartamento_recensione`
--

DROP TABLE IF EXISTS `appartamento_recensione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appartamento_recensione` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_appartamento_fk` FOREIGN KEY (`id`) REFERENCES `appartamenti` (`id`),
  CONSTRAINT `id_recensione_fk` FOREIGN KEY (`id`) REFERENCES `recensioni` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appartamento_recensione`
--

LOCK TABLES `appartamento_recensione` WRITE;
/*!40000 ALTER TABLE `appartamento_recensione` DISABLE KEYS */;
/*!40000 ALTER TABLE `appartamento_recensione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proprietari`
--

DROP TABLE IF EXISTS `proprietari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proprietari` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proprietari`
--

LOCK TABLES `proprietari` WRITE;
/*!40000 ALTER TABLE `proprietari` DISABLE KEYS */;
/*!40000 ALTER TABLE `proprietari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recensioni`
--

DROP TABLE IF EXISTS `recensioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recensioni` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `testo` varchar(250) NOT NULL,
  `data` date NOT NULL,
  `giorni_permanenza` tinyint NOT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--

-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;

-- Dumping data for table `recensioni`
--

LOCK TABLES `recensioni` WRITE;
/*!40000 ALTER TABLE `recensioni` DISABLE KEYS */;
/*!40000 ALTER TABLE `recensioni` ENABLE KEYS */;

UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-09 16:54:32

-- Dump completed on 2025-01-09 10:35:08

