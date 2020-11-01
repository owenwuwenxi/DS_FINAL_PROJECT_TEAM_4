CREATE DATABASE OCFR_TEAM4;

USE OCFR_TEAM4;

DROP TABLE IF EXISTS MemberCertification;
DROP TABLE IF EXISTS MemberTable;
DROP TABLE IF EXISTS Certification;
DROP TABLE IF EXISTS UserTable;

CREATE TABLE MemberTable(

memberID INT(5) PRIMARY KEY auto_increment,

firstName VARCHAR(25) NOT NULL,

lastName VARCHAR(25) NOT NULL,

radioNumber VARCHAR(10) NOT NULL,

stationNumber INT(10) NOT NULL,

isActive ENUM("Active", "Not Active") NOT NULL DEFAULT "Active",

address VARCHAR(255) NOT NULL,

preferredEmail VARCHAR(255) NOT NULL,

dob DATE DEFAULT NULL,

startDate CHAR(8) NOT NULL,

gender ENUM("Female", "Male", "Other", "Prefer Not to Disclose") NOT NULL DEFAULT "Prefer Not to Disclose",

dPosition VARCHAR(25)

);





CREATE TABLE Certification (

certificationID INT(5) PRIMARY KEY auto_increment,

certifyingAgency VARCHAR(255) NOT NULL,

certificationName VARCHAR(255) NOT NULL,

standardExpiry CHAR(8) NOT NULL

);



CREATE TABLE MemberCertification (
mcID INT PRIMARY KEY auto_increment,
memberID INT (5),
certificationID INT (5),

FOREIGN KEY (memberID) REFERENCES MemberTable(memberID) ON DELETE CASCADE,
FOREIGN KEY (certificationID) REFERENCES Certification(certificationID),

renewedDate CHAR(8),

expirationDate CHAR(8) NOT NULL

);



CREATE TABLE UserTable (

email VARCHAR(255) PRIMARY KEY,

user_Password VARCHAR (255) NOT NULL

);



INSERT INTO MemberTable(memberID, firstName, lastName, radioNumber, stationNumber, isActive, address, preferredEmail, dob, startDATE, gender, dPosition)
VALUES  (00001, "Kathyrn", "Pryde", "A-1", "all", "Active", "1123 Xavier School Drive, Watkinsville, GA 30677", "kpryde@ocfire.com", "10/4/1975", "9/1/2000", "Female", "Chief"),

(00002, "Piotr", "Rasputin", 841, 8, "Active", "A31 Mother Russia Road, Seattle, WA 98133", "rpiotr@ocfire.com", "10/5/1972", "05/15/2015", "Male", "Level 2 Firefighter"),

 (00003, "Warren", "Worthington", 122, 1, "Active", "1140 Experiment Station Rd Watkinsville, GA", "warrenworthington@ocfire.com", "09/23/1965", "08/24/2018", "Male", "level 1 firefighter");





INSERT INTO Certification (certificationID, certifyingAgency, certificationName, standardExpiry) VALUES

(00001, "CPR for Healthcare Providers/American Heart Association", "CPRHC", 2),

 (00002, "CPR for the Professional Rescuer/American Red Cross", "CPRPR", 2),

 (00003, "Athens Technical College", "Firefighter I", 3),

(00004, "Ivy Technical College", "Firefighter II", 3),

(00005, "Georgia POST Academy", "POST", 5),

 (00006, "Hazmat Academy", "HAZMAT", 3),

 (00007, "EMT College", "EMT-Adv", 5);





INSERT INTO MemberCertification (memberID, certificationID, renewedDate, expirationDate) VALUES

(00001, 00004, "08/2018", "08/2020"),

 (00001, 00002, "07/2017", "07/2019"),

 (00001, 00006, "05/2016", "02/2020"),

 (00002, 00007, "09/2020", "09/2025"),

 (00002, 00001, "07/2019", "07/2021"),

 (00003, 00001, "07/2020", "07/2022"),

(00003, 00003, "08/2020", "08/2023");



INSERT INTO UserTable (email, user_Password) VALUES

("jjohn@ocfire.com", "iamjohn"),

("stevebrown@ocfire.com", "elephantsareCUTE"),

("marypoppins@ocfire.com", "Ilovemygrandma1967"),

("lilwayne@ocfire.com", "rapper2020!2000"),

 ("marshmello@ocfire.com", "NoAudienceNoConcert&"),

 ("datboi@ocfire.com", "DATboi");

join Certification, MemberCertification
