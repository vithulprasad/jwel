//Event creation

// CREATE TABLE `Events` (
//     `event_id` INT(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     `event_name` VARCHAR(50) DEFAULT NULL,
//     `event_start_date` DATE DEFAULT NULL,
//     `event_start_time` TIME DEFAULT NULL,
//     `event_end_date` DATE DEFAULT NULL,
//     `event_end_time` TIME DEFAULT NULL,
// 	`event_cover_image` VARCHAR(50) DEFAULT NULL,
//     `event_type`VARCHAR(50) DEFAULT NULL,
//     `event_description`TEXT DEFAULT NULL,
//     `event_method`ENUM('open', 'closed') DEFAULT NULL,
//     `event_venue`VARCHAR(50) DEFAULT NULL,
//     `event_orientation_date` DATE DEFAULT NULL,
//     `event_age_restriction`INT(30) DEFAULT NULL,
//     `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
//     `updated_at`timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
// )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

//Student creation

// CREATE TABLE `Students` (
//     `student_id` INT(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     `student_name` VARCHAR(50) DEFAULT NULL,
//     `school` INT(50) ,
//     `school_address` VARCHAR(50) DEFAULT NULL,
//     `email_address` VARCHAR(50) DEFAULT NULL,
//     `phone_number` VARCHAR(20) DEFAULT NULL,
//     `parents_phone_number` VARCHAR(20) DEFAULT NULL,
//     `student_type` ENUM('student', 'admin', 'notDefined') DEFAULT NULL,
//     `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
//     `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


//school creation

// CREATE TABLE `Schools` (
//     `school_id` INT(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     `school_name` VARCHAR(50) DEFAULT NULL,
//     `school_type` ENUM('independent', 'group') DEFAULT NULL,
//     `school_number` VARCHAR(20) DEFAULT NULL,
//     `school_address` VARCHAR(50) DEFAULT NULL,
//     `school_phone_number` VARCHAR(20) DEFAULT NULL,
//     `principal_name` VARCHAR(50) DEFAULT NULL,
//     `principal_email` VARCHAR(50) DEFAULT NULL,
//     `principal_phone_number` VARCHAR(20) DEFAULT NULL,
//     `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
//     `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


//Minstry

// CREATE TABLE `Ministries` (
//     `ministry_id` INT(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     `ministry_name` VARCHAR(50) DEFAULT NULL,
   
//     `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
//     `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `Students` (
    `student_id` INT(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `student_name` VARCHAR(50) DEFAULT NULL,
    `school_id` INT(30) NOT NULL,  
    `school_address` VARCHAR(50) DEFAULT NULL,
    `email_address` VARCHAR(50) DEFAULT NULL,
    `phone_number` VARCHAR(20) DEFAULT NULL,
    `parents_phone_number` VARCHAR(20) DEFAULT NULL,
    `student_type` ENUM('student', 'admin', 'notDefined') DEFAULT NULL,
    `student_status` ENUM('active', 'inactive' ) DEFAULT "active",
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    
    FOREIGN KEY (`school_id`) REFERENCES `Schools` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `event_schools` (
    `event_school_id` INT(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `event_id` INT(30) NOT NULL,
    `school_id` INT(30) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    
    FOREIGN KEY (`event_id`) REFERENCES `Events` (`event_id`),
    FOREIGN KEY (`school_id`) REFERENCES `Schools` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `event_mentors` (
    `event_mentor_id` INT(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `event_id` INT(30) NOT NULL,
    `mentor_id` INT(30) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    
    FOREIGN KEY (`event_id`) REFERENCES `Events` (`event_id`),
    FOREIGN KEY (`mentor_id`) REFERENCES `Mentors` (`mentor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
