-- CreateTable
CREATE TABLE `Block` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `confirmations` INTEGER NULL,
    `size` INTEGER NOT NULL,
    `strippedsize` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `version` INTEGER NOT NULL,
    `versionHex` VARCHAR(191) NOT NULL,
    `merkleroot` VARCHAR(191) NOT NULL,
    `time` BIGINT NOT NULL,
    `mediantime` BIGINT NOT NULL,
    `nonce` BIGINT NOT NULL,
    `bits` VARCHAR(191) NOT NULL,
    `difficulty` INTEGER NOT NULL,
    `chainwork` VARCHAR(191) NOT NULL,
    `headerhash` VARCHAR(191) NULL,
    `mixhash` VARCHAR(191) NULL,
    `previousblockhash` VARCHAR(191) NULL,
    `nextblockhash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Block_hash_key`(`hash`),
    UNIQUE INDEX `Block_height_key`(`height`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `version` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `vsize` INTEGER NOT NULL,
    `locktime` INTEGER NOT NULL,
    `hex` TEXT NOT NULL,
    `blockhash` VARCHAR(191) NOT NULL,
    `height` BIGINT NOT NULL,
    `confirmations` INTEGER NULL,
    `time` BIGINT NOT NULL,
    `blockId` INTEGER NULL,

    UNIQUE INDEX `Transaction_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coinbase` VARCHAR(191) NULL,
    `sequence` BIGINT NOT NULL,
    `txid` VARCHAR(191) NULL,
    `vout` INTEGER NULL,
    `scriptSig` JSON NULL,
    `value` DOUBLE NULL,
    `valueSat` BIGINT NULL,
    `address` VARCHAR(191) NULL,
    `transactionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `n` INTEGER NOT NULL,
    `scriptPubKey` JSON NOT NULL,
    `valueSat` BIGINT NULL,
    `transactionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `balance` INTEGER NULL,
    `received` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `units` INTEGER NOT NULL,
    `reissuable` BOOLEAN NOT NULL,
    `has_ipfs` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_blockId_fkey` FOREIGN KEY (`blockId`) REFERENCES `Block`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vin` ADD CONSTRAINT `Vin_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vout` ADD CONSTRAINT `Vout_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
