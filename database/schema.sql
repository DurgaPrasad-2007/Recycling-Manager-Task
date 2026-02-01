-- ============================================
-- Recycling Production Line Manager Selection System
-- MySQL Database Schema
-- ============================================

-- Drop existing tables if running fresh
DROP TABLE IF EXISTS rankings;
DROP TABLE IF EXISTS evaluations;
DROP TABLE IF EXISTS candidates;

-- ============================================
-- CANDIDATES TABLE
-- Stores core candidate information
-- ============================================
CREATE TABLE candidates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    years_experience INT NOT NULL DEFAULT 0,
    education_level ENUM('High School', 'Associate', 'Bachelor', 'Master', 'PhD') NOT NULL,
    certifications JSON,  -- Array of certification names
    skills JSON,          -- Array of skill objects with name and proficiency
    summary TEXT,         -- Brief professional summary
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for common queries
    INDEX idx_experience (years_experience),
    INDEX idx_education (education_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- EVALUATIONS TABLE
-- Stores AI-generated scores for each candidate
-- ============================================
CREATE TABLE evaluations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    
    -- Three core evaluation dimensions (0-100 scale)
    crisis_management_score DECIMAL(5,2) NOT NULL CHECK (crisis_management_score BETWEEN 0 AND 100),
    sustainability_score DECIMAL(5,2) NOT NULL CHECK (sustainability_score BETWEEN 0 AND 100),
    team_motivation_score DECIMAL(5,2) NOT NULL CHECK (team_motivation_score BETWEEN 0 AND 100),
    
    -- Metadata
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    evaluator_version VARCHAR(50) DEFAULT 'v1.0', -- Track AI model version
    
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    
    -- Composite index for audit queries
    INDEX idx_candidate_date (candidate_id, evaluated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- RANKINGS TABLE
-- Materialized ranking data, auto-updated via trigger
-- ============================================
CREATE TABLE rankings (
    candidate_id INT PRIMARY KEY,
    total_score DECIMAL(6,2) NOT NULL,
    rank_position INT NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    
    INDEX idx_rank (rank_position),
    INDEX idx_score (total_score DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TRIGGER: Auto-update rankings on evaluation insert/update
-- Weights: Crisis=35%, Sustainability=35%, Motivation=30%
-- ============================================
DELIMITER //

CREATE TRIGGER after_evaluation_insert
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    DECLARE weighted_score DECIMAL(6,2);
    
    -- Calculate weighted score
    SET weighted_score = (NEW.crisis_management_score * 0.35) + 
                         (NEW.sustainability_score * 0.35) + 
                         (NEW.team_motivation_score * 0.30);
    
    -- Upsert into rankings
    INSERT INTO rankings (candidate_id, total_score, rank_position)
    VALUES (NEW.candidate_id, weighted_score, 0)
    ON DUPLICATE KEY UPDATE 
        total_score = weighted_score,
        last_updated = CURRENT_TIMESTAMP;
    
    -- Recalculate all rank positions
    SET @rank = 0;
    UPDATE rankings SET rank_position = (@rank := @rank + 1)
    ORDER BY total_score DESC;
END//

CREATE TRIGGER after_evaluation_update
AFTER UPDATE ON evaluations
FOR EACH ROW
BEGIN
    DECLARE weighted_score DECIMAL(6,2);
    
    SET weighted_score = (NEW.crisis_management_score * 0.35) + 
                         (NEW.sustainability_score * 0.35) + 
                         (NEW.team_motivation_score * 0.30);
    
    UPDATE rankings 
    SET total_score = weighted_score, last_updated = CURRENT_TIMESTAMP
    WHERE candidate_id = NEW.candidate_id;
    
    SET @rank = 0;
    UPDATE rankings SET rank_position = (@rank := @rank + 1)
    ORDER BY total_score DESC;
END//

DELIMITER ;

-- ============================================
-- VIEW: Leaderboard with joined data
-- ============================================
CREATE VIEW leaderboard AS
SELECT 
    r.rank_position,
    c.id,
    c.name,
    c.years_experience,
    c.education_level,
    e.crisis_management_score,
    e.sustainability_score,
    e.team_motivation_score,
    r.total_score
FROM rankings r
JOIN candidates c ON r.candidate_id = c.id
JOIN evaluations e ON e.candidate_id = c.id
ORDER BY r.rank_position ASC;
