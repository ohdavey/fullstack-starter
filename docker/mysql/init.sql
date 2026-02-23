CREATE DATABASE IF NOT EXISTS `challenge`;
CREATE DATABASE IF NOT EXISTS `challenge_test`;

GRANT ALL PRIVILEGES ON `challenge`.* TO 'challenge'@'%';
GRANT ALL PRIVILEGES ON `challenge_test`.* TO 'challenge'@'%';

FLUSH PRIVILEGES;
