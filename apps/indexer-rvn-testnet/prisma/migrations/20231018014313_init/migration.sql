-- CreateTable
CREATE TABLE `Block` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `confirmations` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `strippedsize` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `version` INTEGER NOT NULL,
    `versionHex` VARCHAR(191) NOT NULL,
    `merkleroot` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,
    `mediantime` INTEGER NOT NULL,
    `nonce` INTEGER NOT NULL,
    `bits` VARCHAR(191) NOT NULL,
    `difficulty` INTEGER NOT NULL,
    `chainwork` VARCHAR(191) NOT NULL,
    `previousblockhash` VARCHAR(191) NOT NULL,
    `nextblockhash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Block_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
