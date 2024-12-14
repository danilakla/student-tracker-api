-- Table for Admin (replacing User)
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

-- Table for Teacher
CREATE TABLE teacher (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    admin_id INT NOT NULL,
    CONSTRAINT fk_teacher_admin FOREIGN KEY (admin_id) REFERENCES admin (id)
);

-- Table for University
CREATE TABLE universitys (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin_id INT UNIQUE NOT NULL,
    CONSTRAINT fk_university_admin FOREIGN KEY (admin_id) REFERENCES admin (id)
);

-- Table for Student
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    student_number VARCHAR(255)
);

-- Table for Subject
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    term VARCHAR(255) NOT NULL,
    number_of_student INT NOT NULL,
    number_pass_lecture INT NOT NULL,
    teacher_id INT NOT NULL,
    CONSTRAINT fk_subject_teacher FOREIGN KEY (teacher_id) REFERENCES teacher (id)
);

-- Table for StudentSubject (many-to-many relationship)
CREATE TABLE student_subjects (
  id  SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    attendance_count INT NOT NULL,
    review_status BOOLEAN NOT NULL,
    last_time_scan VARCHAR(255) NOT NULL,
    CONSTRAINT fk_student_subject_student FOREIGN KEY (student_id) REFERENCES student (id),
    CONSTRAINT fk_student_subject_subject FOREIGN KEY (subject_id) REFERENCES subjects (id)
);

-- Table for QuizeForm
CREATE TABLE quize_form (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    form JSON,
    teacher_id INT NOT NULL,
    CONSTRAINT fk_quizeform_teacher FOREIGN KEY (teacher_id) REFERENCES teacher (id)
);
