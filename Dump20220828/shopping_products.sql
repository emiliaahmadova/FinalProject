-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: shopping
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DepartmentId` int DEFAULT NULL,
  `CategoryId` int NOT NULL,
  `BrandId` int NOT NULL,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Price` double NOT NULL,
  `Rating` double NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `IsAviable` tinyint(1) NOT NULL,
  `CreateDate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UpdateDate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Order` int NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Products_BrandId` (`BrandId`),
  KEY `IX_Products_CategoryId` (`CategoryId`),
  KEY `IX_Products_DepartmentId` (`DepartmentId`),
  CONSTRAINT `FK_Products_Brands_BrandId` FOREIGN KEY (`BrandId`) REFERENCES `brands` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Products_Categories_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Products_Departments_DepartmentId` FOREIGN KEY (`DepartmentId`) REFERENCES `departments` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,2,1,1,'Geisshorn 3in1 Jkt W',299,0,'Women’s 3 in 1 jacket',1,NULL,NULL,1,0),(2,2,1,1,'Stirnberg Ins Jkt W',250,0,'Waterproof winter jacket women',1,NULL,NULL,2,0),(3,1,1,1,'Jasper 3in1 Jkt M',319,0,'Men’s 3 in 1 jacket',1,NULL,NULL,3,0),(4,1,1,1,'Highest Peak Jacket M',300,0,'Rain jacket men',1,NULL,NULL,4,0),(5,2,3,1,'Woodland 2 Texapore ',99,0,'Waterproof hiking boots women',1,NULL,NULL,5,0),(6,2,3,1,'Force Striker Texapore',99,0,'Waterproof hiking boots women',1,NULL,NULL,6,0),(7,1,3,1,'Woodland 2 Texapore',99,0,'Waterproof hiking boots men',1,NULL,NULL,7,0),(8,1,3,1,'Vojo 3 Texapore ',99,0,'Waterproof hiking boots men',1,NULL,NULL,8,0),(9,2,2,7,'Tandem Trail™ 22L ',45,0,'backpack',1,NULL,NULL,9,0),(10,2,5,1,'Rainy Day Pants',69.95,0,'Overtrousers',1,NULL,NULL,9,0),(11,1,2,7,'Newton Ridge™ 36L',101.98,0,'Crafted to keep essentials like water within reach, plus a hip belt with pockets, and a breathable, a foam-padded back panel and shoulder straps.',1,NULL,NULL,10,0),(13,1,4,3,'Paly Cropped Tank',75,0,'Captivate with this shirt’s versatile urban look that works as well at happy hour as it does in the back yard. The real mother of pearl buttons and embroidered crocodile...',1,NULL,NULL,11,0),(14,2,4,2,'Nike Cropped Tank',76,0,'Crop top',1,NULL,NULL,12,0),(15,2,1,3,'Track Jacket Adidas',55,0,'Captivate with this shirt’s versatile urban look that works as well at happy hour as it does in the back yard. The real mother of pearl buttons and embroidered crocodile...',1,NULL,NULL,13,0),(16,2,1,2,'Women\'s Anorak Jacket',100,0,'Captivate with this shirt’s versatile urban look that works as well at happy hour as it does in the back yard. The real mother of pearl buttons and embroidered crocodile...',1,NULL,NULL,14,0),(17,1,5,5,'Men’s Antora Rain Pants',89,0,'Rain pants',1,NULL,NULL,15,0),(18,1,1,5,'Antora Rain Hoodie',109,0,'The Men’s Antora Rain Hoodie is a modern silhouette inspired by our iconic Mountain Light Jacket. Made with 100% recycled fabrics, this water-repellent, breathable, and windproof shell features secure-zip pockets and an adjustable hood.',1,NULL,NULL,15,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-28 22:18:07
