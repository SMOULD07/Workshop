CREATE TABLE Utilisateur (
    ID_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Rôle ENUM('étudiant', 'administrateur') NOT NULL
);


CREATE TABLE Catégorie (
    ID_catégorie INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Description TEXT
);


CREATE TABLE Suggestion (
    ID_suggestion INT AUTO_INCREMENT PRIMARY KEY,
    Titre VARCHAR(255) NOT NULL,
    Description TEXT,
    ID_utilisateur INT,
    ID_catégorie INT,
    CONSTRAINT FK_Utilisateur_Suggestion FOREIGN KEY (ID_utilisateur) REFERENCES Utilisateur(ID_utilisateur) ON DELETE CASCADE,
    CONSTRAINT FK_Catégorie_Suggestion FOREIGN KEY (ID_catégorie) REFERENCES Catégorie(ID_catégorie) ON DELETE SET NULL
);


CREATE TABLE Tag (
    ID_tag INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL
);


CREATE TABLE Suggestion_Tag (
    ID_suggestion INT,
    ID_tag INT,
    PRIMARY KEY (ID_suggestion, ID_tag),
    CONSTRAINT FK_Suggestion_Tag_S FOREIGN KEY (ID_suggestion) REFERENCES Suggestion(ID_suggestion) ON DELETE CASCADE,
    CONSTRAINT FK_Suggestion_Tag_T FOREIGN KEY (ID_tag) REFERENCES Tag(ID_tag) ON DELETE CASCADE
);


CREATE TABLE Vote (
    ID_vote INT AUTO_INCREMENT PRIMARY KEY,
    ID_suggestion INT,
    ID_utilisateur INT,
    Type_de_vote ENUM('pour', 'contre') NOT NULL,
    CONSTRAINT FK_Vote_Suggestion FOREIGN KEY (ID_suggestion) REFERENCES Suggestion(ID_suggestion) ON DELETE CASCADE,
    CONSTRAINT FK_Vote_Utilisateur FOREIGN KEY (ID_utilisateur) REFERENCES Utilisateur(ID_utilisateur) ON DELETE CASCADE
);
