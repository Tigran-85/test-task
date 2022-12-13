
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `userName` text NOT NULL,
  `cryptoWalletAddress` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

INSERT INTO users (`userName`, `cryptoWalletAddress`)
VALUES 
    ("John", "address1")
    ("Ivan", "address1")
    