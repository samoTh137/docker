-- MySQL Script generated by MySQL Workbench
-- Thu Apr 20 11:17:02 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_badge_of_honour
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_badge_of_honour
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_badge_of_honour` DEFAULT CHARACTER SET utf8 ;
USE `db_badge_of_honour` ;

-- -----------------------------------------------------
-- Table `db_badge_of_honour`.`tbl_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_badge_of_honour`.`tbl_user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(330) NOT NULL,
  `password` VARCHAR(255) NOT NULL DEFAULT 'null',
  `role` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_badge_of_honour`.`tbl_application`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_badge_of_honour`.`tbl_application` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `national_register_nr` CHAR(11) NOT NULL,
  `firstname` VARCHAR(64) NOT NULL,
  `lastname` VARCHAR(64) NOT NULL,
  `birthplace` VARCHAR(64) NOT NULL,
  `main_profession` VARCHAR(120) NOT NULL,
  `job_title` VARCHAR(120) NOT NULL,
  `grade_or_rank` CHAR(4) NOT NULL,
  `initiator` VARCHAR(64) NOT NULL,
  `distinctions_received` LONGTEXT NOT NULL,
  `tot_year_service` TINYINT UNSIGNED NOT NULL,
  `result_evaluation` TEXT NULL,
  `sanctions` TEXT NULL,
  `status` VARCHAR(30) NOT NULL,
  `proposed_honorary_distinction` VARCHAR(40) NOT NULL,
  `report_about_involved` TEXT NULL,
  `birthdate` DATE NOT NULL,
  `salary_scale` VARCHAR(20) NOT NULL,
  `tot_month_service` TINYINT NOT NULL,
  `certificate` TEXT NULL,
  `decision` TEXT NULL,
  `decision_translated` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_badge_of_honour`.`tbl_career`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_badge_of_honour`.`tbl_career` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `grade` VARCHAR(50) NOT NULL,
  `from_date` DATE NOT NULL,
  `to_date` DATE NOT NULL,
  `performance_breach` DECIMAL NOT NULL,
  `nature_performances` VARCHAR(25) NOT NULL,
  `id_application` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_application_idx` (`id_application` ASC) VISIBLE,
  CONSTRAINT `id_application`
    FOREIGN KEY (`id_application`)
    REFERENCES `db_badge_of_honour`.`tbl_application` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
