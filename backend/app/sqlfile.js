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
//     `school` VARCHAR(50) DEFAULT NULL,
//     `school_address` VARCHAR(50) DEFAULT NULL,
//     `email_address` VARCHAR(50) DEFAULT NULL,
//     `phone_number` VARCHAR(20) DEFAULT NULL,
//     `parents_phone_number` VARCHAR(20) DEFAULT NULL,
//     `student_type` ENUM('student', 'admin', 'notDefined') DEFAULT NULL,
//     `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
//     `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
