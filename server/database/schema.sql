CREATE TABLE utilisateur (
    ID_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Rôle ENUM('etudiant', 'administrateur') NOT NULL
);


CREATE TABLE categorie (
    ID_categorie INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Description TEXT
);


CREATE TABLE suggestion (
    ID_suggestion INT AUTO_INCREMENT PRIMARY KEY,
    Titre VARCHAR(255) NOT NULL,
    Description TEXT,
    ID_utilisateur INT,
    ID_categorie INT,
    CONSTRAINT FK_utilisateur_Suggestion FOREIGN KEY (ID_utilisateur) REFERENCES utilisateur(ID_utilisateur) ON DELETE CASCADE,
    CONSTRAINT FK_categorie_Suggestion FOREIGN KEY (ID_categorie) REFERENCES categorie(ID_categorie) ON DELETE SET NULL
);


CREATE TABLE tag (
    ID_tag INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL
);


CREATE TABLE suggestion_tag (
    ID_suggestion INT,
    ID_tag INT,
    PRIMARY KEY (ID_suggestion, ID_tag),
    CONSTRAINT FK_suggestion_tag_S FOREIGN KEY (ID_suggestion) REFERENCES suggestion(ID_suggestion) ON DELETE CASCADE,
    CONSTRAINT FK_suggestion_tag_T FOREIGN KEY (ID_tag) REFERENCES tag(ID_tag) ON DELETE CASCADE
);


CREATE TABLE vote (
    ID_vote INT AUTO_INCREMENT PRIMARY KEY,
    ID_suggestion INT,
    ID_utilisateur INT,
    Type_de_vote ENUM('pour', 'contre') NOT NULL,
    CONSTRAINT FK_vote_suggestion FOREIGN KEY (ID_suggestion) REFERENCES Suggestion(ID_suggestion) ON DELETE CASCADE,
    CONSTRAINT FK_vote_utilisateur FOREIGN KEY (ID_utilisateur) REFERENCES Utilisateur(ID_utilisateur) ON DELETE CASCADE
);
