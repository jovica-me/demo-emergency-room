-- CreateTable
CREATE TABLE `Example` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pacijent` (
    `jmbg` INTEGER NOT NULL,
    `ime` VARCHAR(191) NOT NULL,
    `prezime` VARCHAR(191) NOT NULL,
    `datumRodj` DATETIME(3) NOT NULL,
    `lbo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`jmbg`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Poseta` (
    `id` VARCHAR(191) NOT NULL,
    `dolazak` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `odlazak` DATETIME(3) NOT NULL,
    `gotova` BOOLEAN NOT NULL DEFAULT false,
    `uput` VARCHAR(191) NOT NULL,
    `simptomi` VARCHAR(191) NOT NULL,
    `prioritet` INTEGER NOT NULL,
    `pacijentJMBG` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SokSoba` (
    `id` VARCHAR(191) NOT NULL,
    `zauzeta` BOOLEAN NOT NULL DEFAULT false,
    `posetaId` VARCHAR(191) NULL,

    UNIQUE INDEX `SokSoba_posetaId_key`(`posetaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregled` (
    `id` VARCHAR(191) NOT NULL,
    `gotov` BOOLEAN NOT NULL DEFAULT false,
    `posetaId` VARCHAR(191) NOT NULL,
    `ordinacijaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Izvestaj` (
    `id` VARCHAR(191) NOT NULL,
    `datum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `misljenjeDoktora` VARCHAR(191) NOT NULL,
    `terapija` VARCHAR(191) NULL,
    `kontorla` VARCHAR(191) NULL,
    `pregledId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Izvestaj_pregledId_key`(`pregledId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Datoteka` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `naziv` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `izvestajId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Datoteka_izvestajId_key`(`izvestajId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ordinacija` (
    `id` VARCHAR(191) NOT NULL,
    `imeOrdinacija` VARCHAR(191) NOT NULL,
    `brojSobe` VARCHAR(191) NOT NULL,
    `telefon` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Osoblje` (
    `id` VARCHAR(191) NOT NULL,
    `ime` VARCHAR(191) NOT NULL,
    `prezime` VARCHAR(191) NOT NULL,
    `kontakt` VARCHAR(191) NOT NULL,
    `ordinacijaId` VARCHAR(191) NOT NULL,
    `tipOsoblja` ENUM('NE_MEDICINSKO', 'MEDICINSKI_RADNIK', 'DOKTOR', 'HIRURG') NOT NULL DEFAULT 'NE_MEDICINSKO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
