-- CreateTable
CREATE TABLE `WalletAccount` (
    `id` VARCHAR(191) NOT NULL,
    `index` INTEGER NOT NULL,
    `label` VARCHAR(191) NULL,
    `wallet_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WalletAccount_index_wallet_id_key`(`index`, `wallet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WalletAddress` (
    `id` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `wallet_account_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WalletAddress_address_wallet_account_id_key`(`address`, `wallet_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WalletAccount` ADD CONSTRAINT `WalletAccount_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WalletAddress` ADD CONSTRAINT `WalletAddress_wallet_account_id_fkey` FOREIGN KEY (`wallet_account_id`) REFERENCES `WalletAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
