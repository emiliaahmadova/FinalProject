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
-- Table structure for table `productphotos`
--

DROP TABLE IF EXISTS `productphotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productphotos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ProductId` int NOT NULL,
  `ProductColorId` int NOT NULL,
  `FilePath` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `FileName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CreateDate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UpdateDate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Order` int NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_ProductPhotos_ProductId` (`ProductId`),
  CONSTRAINT `FK_ProductPhotos_Products_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `products` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productphotos`
--

LOCK TABLES `productphotos` WRITE;
/*!40000 ALTER TABLE `productphotos` DISABLE KEYS */;
INSERT INTO `productphotos` VALUES (1,1,0,'https://localhost:5001/Storage/Uploads/6b487bbe-38d6-4724-862b-1c0f7205b8da.jpg',NULL,NULL,NULL,0,0),(2,1,0,'https://localhost:5001/Storage/Uploads/60e1e876-714d-4dc6-a276-649432e072e3.jpg',NULL,NULL,NULL,0,0),(3,1,0,'https://localhost:5001/Storage/Uploads/735aba0e-50c2-4756-a90a-13f0a97ed709.jpg',NULL,NULL,NULL,0,0),(4,1,0,'https://localhost:5001/Storage/Uploads/00fc8520-c21a-464a-bac7-59d132943b0b.jpg',NULL,NULL,NULL,0,0),(5,2,0,'https://localhost:5001/Storage/Uploads/ae1fcba7-4f76-434c-8b78-48c2837fa51c.jpg',NULL,NULL,NULL,0,0),(6,2,0,'https://localhost:5001/Storage/Uploads/d2fe1b62-3527-47e4-8d54-8e9b47b79f94.jpg',NULL,NULL,NULL,0,0),(7,2,0,'https://localhost:5001/Storage/Uploads/7bc252fe-0992-403a-8848-cfd0c0a8bf67.jpg',NULL,NULL,NULL,0,0),(8,2,0,'https://localhost:5001/Storage/Uploads/7b4c8183-1f8e-4009-9c06-e91efab4d51b.jpg',NULL,NULL,NULL,0,0),(9,3,0,'https://localhost:5001/Storage/Uploads/fcc73dbf-0664-4862-8e6f-4c5482e0238e.webp',NULL,NULL,NULL,0,0),(10,3,0,'https://localhost:5001/Storage/Uploads/59a4f997-7031-4f0c-ba60-e1cb063a4519.webp',NULL,NULL,NULL,0,0),(11,3,0,'https://localhost:5001/Storage/Uploads/2a821936-15c4-4320-a575-15a229d6aca4.webp',NULL,NULL,NULL,0,0),(12,3,0,'https://localhost:5001/Storage/Uploads/87fbf3ca-9f0c-418c-b1f5-a1d7fd73348c.jpg',NULL,NULL,NULL,0,0),(13,4,0,'https://localhost:5001/Storage/Uploads/eed020a3-b7f3-4658-9a10-0525e801acd5.webp',NULL,NULL,NULL,0,0),(14,4,0,'https://localhost:5001/Storage/Uploads/24eb5ca0-adf2-4716-9a76-ddf0c5aa3e05.jpg',NULL,NULL,NULL,0,0),(15,4,0,'https://localhost:5001/Storage/Uploads/360d1c14-bf10-4906-acde-665d87baf1b9.jpg',NULL,NULL,NULL,0,0),(16,4,0,'https://localhost:5001/Storage/Uploads/51c48bcb-8001-4926-b4a1-84340e507c7a.webp',NULL,NULL,NULL,0,0),(21,5,0,'https://localhost:5001/Storage/Uploads/9567ebf0-f1d9-4fde-b287-7788307c9fe8.jpg',NULL,NULL,NULL,0,0),(22,5,0,'https://localhost:5001/Storage/Uploads/2b0f797f-a747-42ae-b749-5592070b12c5.jpg',NULL,NULL,NULL,0,0),(23,5,0,'https://localhost:5001/Storage/Uploads/d7f238b4-b102-4607-91d9-363e38ec572c.jpg',NULL,NULL,NULL,0,0),(24,5,0,'https://localhost:5001/Storage/Uploads/425fd2a4-df58-4a1b-a1fc-82f065fa57a7.jpg',NULL,NULL,NULL,0,0),(25,6,0,'https://localhost:5001/Storage/Uploads/93ef7940-3f5b-49e1-bbd3-30cfe0c51875.jpg',NULL,NULL,NULL,0,0),(26,6,0,'https://localhost:5001/Storage/Uploads/e37957f2-f371-4e0e-ad35-5cd3682cd9a0.jpg',NULL,NULL,NULL,0,0),(27,6,0,'https://localhost:5001/Storage/Uploads/763e898f-491b-47cb-a72b-70d10951111a.jpg',NULL,NULL,NULL,0,0),(28,6,0,'https://localhost:5001/Storage/Uploads/3c42d11e-7b69-4100-be3f-8b9c6d867c87.jpg',NULL,NULL,NULL,0,0),(45,7,0,'https://localhost:5001/Storage/Uploads/dea74ec2-905d-4433-b692-288e8d72c0b0.png',NULL,NULL,NULL,0,0),(46,7,0,'https://localhost:5001/Storage/Uploads/2eec4ce9-32e2-4dd2-b103-dd1f2c1aa647.png',NULL,NULL,NULL,0,0),(47,7,0,'https://localhost:5001/Storage/Uploads/4bfa2ca7-06aa-4687-b0a6-fdb486318ecc.webp',NULL,NULL,NULL,0,0),(48,7,0,'https://localhost:5001/Storage/Uploads/84ea94ea-eb3b-4279-b84f-74de928e50db.png',NULL,NULL,NULL,0,0),(49,8,0,'https://localhost:5001/Storage/Uploads/09a5691b-d926-4213-b9ce-57e068f62b61.webp',NULL,NULL,NULL,0,0),(50,8,0,'https://localhost:5001/Storage/Uploads/128aebf6-3a21-47c8-b2dd-592892b0657e.jpg',NULL,NULL,NULL,0,0),(51,8,0,'https://localhost:5001/Storage/Uploads/3088de45-4eb1-4a22-8897-6e8f2dd80365.jpg',NULL,NULL,NULL,0,0),(52,8,0,'https://localhost:5001/Storage/Uploads/bae35ca2-b4d3-4214-8650-a223aa77c2d0.jpg',NULL,NULL,NULL,0,0),(53,10,0,'https://localhost:5001/Storage/Uploads/306c1249-eb8d-4a0b-883b-49a352ff8426.jpg',NULL,NULL,NULL,0,0),(54,10,0,'https://localhost:5001/Storage/Uploads/8bd54871-279a-4df4-9ff5-ed1eee437738.jpg',NULL,NULL,NULL,0,0),(55,10,0,'https://localhost:5001/Storage/Uploads/2bfedc49-9bdb-44f1-8477-4618d9497aa9.jpg',NULL,NULL,NULL,0,0),(56,10,0,'https://localhost:5001/Storage/Uploads/fa89085e-8d9b-4485-87db-ee581ac93600.jpg',NULL,NULL,NULL,0,0),(57,11,0,'https://localhost:5001/Storage/Uploads/6813ed9c-ecb0-4342-b3d7-ca4ba37cb8e2.webp',NULL,NULL,NULL,0,0),(58,11,0,'https://localhost:5001/Storage/Uploads/dbd45ee3-2dc5-40b0-a71a-4153444918dc.webp',NULL,NULL,NULL,0,0),(59,11,0,'https://localhost:5001/Storage/Uploads/3828860e-58a6-4af3-bc69-65e9d27a89c9.webp',NULL,NULL,NULL,0,0),(60,11,0,'https://localhost:5001/Storage/Uploads/39c70281-d808-4409-a745-d9e9cf4fd0c0.webp',NULL,NULL,NULL,0,0),(65,9,0,'https://localhost:5001/Storage/Uploads/23058919-6b6a-4e12-9d52-b8fa4e0dc530.webp',NULL,NULL,NULL,0,0),(66,9,0,'https://localhost:5001/Storage/Uploads/e30c3761-8896-4d78-afe1-05d10fc38ca2.webp',NULL,NULL,NULL,0,0),(67,9,0,'https://localhost:5001/Storage/Uploads/6ad2edf2-ac5e-47d2-a78c-bd05399277fd.webp',NULL,NULL,NULL,0,0),(68,9,0,'https://localhost:5001/Storage/Uploads/2d047d03-c71d-4401-aca1-133da367d38c.webp',NULL,NULL,NULL,0,0),(73,13,0,'https://localhost:5001/Storage/Uploads/b4be6192-fb9c-44ce-a02a-9aa53c0a735e.webp',NULL,NULL,NULL,0,0),(74,13,0,'https://localhost:5001/Storage/Uploads/5f841896-2a66-430f-8bf7-0fcf1362a7f2.webp',NULL,NULL,NULL,0,0),(75,13,0,'https://localhost:5001/Storage/Uploads/1e403907-0fbb-4b70-8932-e682972948e7.webp',NULL,NULL,NULL,0,0),(76,13,0,'https://localhost:5001/Storage/Uploads/b577bbf8-93a0-4438-9737-28d162b0cd48.webp',NULL,NULL,NULL,0,0),(77,14,0,'https://localhost:5001/Storage/Uploads/3bde0e6c-6071-436c-900e-42e9bc47eb79.webp',NULL,NULL,NULL,0,0),(78,14,0,'https://localhost:5001/Storage/Uploads/415dd9f1-49e7-4d81-89e2-a1ce3cc12c71.webp',NULL,NULL,NULL,0,0),(79,14,0,'https://localhost:5001/Storage/Uploads/4a9602b6-090e-4f6f-90a4-7b91508f0c80.webp',NULL,NULL,NULL,0,0),(80,15,0,'https://localhost:5001/Storage/Uploads/47fad535-64c2-4ce4-9975-5fdd0626eb4a.webp',NULL,NULL,NULL,0,0),(81,15,0,'https://localhost:5001/Storage/Uploads/a12c191b-c879-4d3a-948e-031756be1e5f.webp',NULL,NULL,NULL,0,0),(82,15,0,'https://localhost:5001/Storage/Uploads/169511db-4695-4d39-847d-83b218eb3a26.webp',NULL,NULL,NULL,0,0),(83,15,0,'https://localhost:5001/Storage/Uploads/42f88590-c318-4b15-ab02-ee6ad2255f55.webp',NULL,NULL,NULL,0,0),(88,16,0,'https://localhost:5001/Storage/Uploads/c34179d8-98f5-4ea4-9dcc-16f568404769.webp',NULL,NULL,NULL,0,0),(89,16,0,'https://localhost:5001/Storage/Uploads/72c7e0e4-7f11-4161-b33c-ee413b22bc92.webp',NULL,NULL,NULL,0,0),(90,16,0,'https://localhost:5001/Storage/Uploads/214fa472-4bd1-4a40-ad2b-f0e6641dcf48.webp',NULL,NULL,NULL,0,0),(91,16,0,'https://localhost:5001/Storage/Uploads/02887842-56de-4c53-aa9d-d23f33223edd.webp',NULL,NULL,NULL,0,0),(92,17,0,'https://localhost:5001/Storage/Uploads/c3a17850-b7d8-4fc7-8b2d-b54199880ac2.webp',NULL,NULL,NULL,0,0),(93,17,0,'https://localhost:5001/Storage/Uploads/b51a6d63-2541-4cf5-8da0-9d2cdd2f78a6.webp',NULL,NULL,NULL,0,0),(94,17,0,'https://localhost:5001/Storage/Uploads/01e075a6-4ff8-45c5-bb4c-b4c6163751a7.webp',NULL,NULL,NULL,0,0),(95,18,0,'https://localhost:5001/Storage/Uploads/a554d3a1-7448-48f4-aab9-4087ce8cb6ad.webp',NULL,NULL,NULL,0,0),(96,18,0,'https://localhost:5001/Storage/Uploads/27d3481a-3be3-4a01-acdd-9c596b8c46d7.webp',NULL,NULL,NULL,0,0),(97,18,0,'https://localhost:5001/Storage/Uploads/18fe45a1-f934-44e2-89a4-7e18f8954031.webp',NULL,NULL,NULL,0,0);
/*!40000 ALTER TABLE `productphotos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-28 22:18:05
