-- MySQL Script generated by MySQL Workbench
-- Sat Mar 25 20:02:27 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_aanvragen
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_aanvragen
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_aanvragen` DEFAULT CHARACTER SET utf8 ;
USE `db_aanvragen` ;

-- -----------------------------------------------------
-- Table `db_aanvragen`.`tbl_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_aanvragen`.`tbl_user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(330) NOT NULL,
  `password` VARCHAR(255) NOT NULL DEFAULT 'null',
  `role` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_aanvragen`.`tbl_aanvragen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_aanvragen`.`tbl_aanvragen` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `rijksregisternummer` CHAR(11) NOT NULL,
  `voornaam` VARCHAR(64) NOT NULL,
  `achternaam` VARCHAR(64) NOT NULL,
  `geboorteplaats` VARCHAR(64) NOT NULL,
  `hoofdberoep` VARCHAR(120) NOT NULL,
  `functietitel` VARCHAR(120) NOT NULL,
  `graad_of_rang` CHAR(4) NOT NULL,
  `initiatiefnemer` VARCHAR(64) NOT NULL,
  `al_ontvangen_onderscheidingen` LONGTEXT NOT NULL,
  `totaal_jaren_dienst` TINYINT UNSIGNED NOT NULL,
  `resultaat_evaluaties` TEXT NULL,
  `tucht_strafsancties` TEXT NULL,
  `status` VARCHAR(30) NOT NULL,
  `voorgestelde_ereteken` VARCHAR(40) NOT NULL,
  `verslag_over_betrokkene` TEXT NULL,
  `geboortedatum` DATE NOT NULL,
  `salarisschaal` VARCHAR(45) NOT NULL,
  `totaal_maanden_dienst` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_aanvragen`.`tbl_gegevens_loopbaan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_aanvragen`.`tbl_gegevens_loopbaan` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `graad` CHAR(4) NOT NULL,
  `van` DATE NOT NULL,
  `tot` DATE NOT NULL,
  `prestatiebreuk` VARCHAR(10) NOT NULL,
  `aard_prestaties` VARCHAR(10) NOT NULL,
  `id_aanvraag` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_aanvraag_idx` (`id_aanvraag` ASC) VISIBLE,
  CONSTRAINT `id_aanvraag`
    FOREIGN KEY (`id_aanvraag`)
    REFERENCES `db_aanvragen`.`tbl_aanvragen` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
