# Intalaciones necesarias
npm install express
npm install ts-node


# Así creo las migraciones
npx typeorm migration:create ./src/database/migrations/CreateUsers
npx typeorm migration:create ./src/database/migrations/CreateAppointments

# Ejecutar migraciones para crear las tablas
npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts
# Salida:

# Proyecto4ColorTattoo-master> npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts
# query: SELECT VERSION() AS `version`
# query: SELECT VERSION() AS `version`
# Se ha conetado la base de datos
# query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'Color_Tattoo' AND `TABLE_NAME` = 'migrations'
# query: CREATE TABLE `migrations` (`id` int NOT NULL AUTO_INCREMENT, `timestamp` bigint NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
# query: SELECT * FROM `Color_Tattoo`.`migrations` `migrations` ORDER BY `id` DESC
# 0 migrations are already loaded in the database.
# 2 migrations were found in the source code.
# 2 migrations are new migrations must be executed.
# query: START TRANSACTION
# query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'Color_Tattoo' AND `TABLE_NAME` = 'users'
# query: CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `userName` varchar(50) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(250) NOT NULL, `rol` varchar(20) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT 
# CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `UQ_97672ac88f789774dd47f7c8be3` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB       
# query: INSERT INTO `Color_Tattoo`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1708721592716,"CreateUser1708721592716"]
# Migration CreateUser1708721592716 has been  executed successfully.
# query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'Color_Tattoo' AND `TABLE_NAME` = 'appointments'
# query: CREATE TABLE `appointments` (`id` int NOT NULL AUTO_INCREMENT, `idClient` int NOT NULL, `idArtist` int NOT NULL, `dataTime` datetime NOT 
# NULL, CONSTRAINT `FK_7fec196ff89e097376582cd9055` FOREIGN KEY (`idClient`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `FK_7f376deb212b2f52791356f8f3d` FOREIGN KEY (`idArtist`) REFERENCES `users` (`id`) ON DELETE CASCADE, PRIMARY KEY (`id`)) ENGINE=InnoDB
# query: INSERT INTO `Color_Tattoo`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1708784656888,"CreateAppointments1708784656888"]
# Migration CreateAppointments1708784656888 has been  executed successfully.
# query: COMMIT

# Revertir migraciones para desarrollo y produccion 
npx typeorm-ts-node-commonjs migration:revert -d ./src/data-source.ts


# Seeders para la tabla de usuarios
# He creado un archivo llamado userSeeders dentro de /src/database/seeders
# para ejecutarlo:
npx ts-node src/database/seeders/userSeeder.ts
# Usuarios:
mysql> select * from users;
+----+----------+-------------------+-----------+-------+---------------------+---------------------+
| id | userName | email             | password  | rol   | created_at          | updated_at          |
+----+----------+-------------------+-----------+-------+---------------------+---------------------+
|  1 | user1    | user1@example.com | password1 | admin | 2024-02-24 14:55:42 | 2024-02-24 14:55:42 |
|  2 | user2    | user2@example.com | password2 | user  | 2024-02-24 14:55:42 | 2024-02-24 14:55:42 |
+----+----------+-------------------+-----------+-------+---------------------+---------------------+

# Reservas:
npx ts-node src/database/seeders/appointmentSeeder.ts
mysql> select * from appointments;
+----+-----------------------------------+------------+------------+---------------------+
| id | descriptionTattoo                 | idClientId | idArtistId | appointmentDate     |
+----+-----------------------------------+------------+------------+---------------------+
|  1 | Ejemplo de descripci�n de tatuaje |          1 |          2 | 2024-04-14 15:30:00 |
+----+-----------------------------------+------------+------------+---------------------+