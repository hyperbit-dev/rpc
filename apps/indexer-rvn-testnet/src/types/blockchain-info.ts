export type BlockchainInfo = {
    /** Current network name as defined in BIP70 (main, test, regtest) */
    chain: string;
    /** The current number of blocks processed in the server */
    blocks: number;
    /** The current number of headers we have validated */
    headers: number;
    /** The hash of the currently best block */
    bestblockhash: string;
    /** The current difficulty */
    difficulty: number;
    /** DGW-180 or BTC */
    difficulty_algorithm: string;
    /** Median time for the current best block */
    mediantime: number;
    /** Estimate of verification progress [0..1] */
    verificationprogress: number;
    /** Total amount of work in active chain, in hexadecimal */
    chainwork: string;
    /** The estimated size of the block and undo files on disk */
    size_on_disk: number;
    /** If the blocks are subject to pruning */
    pruned: boolean;
    /** Lowest-height complete block stored (only present if pruning is enabled) */
    pruneheight: number;
    /** Whether automatic pruning is enabled (only present if pruning is enabled) */
    automatic_pruning: boolean;
    /** The target size used by pruning (only present if automatic pruning is enabled) */
    prune_target_size: number;
    /** Status of softforks in progress */
    softforks: BlockchainInfoSoftFork[];
    /** Status of BIP9 softforks in progress */
    bip9_softforks: BlockchainInfoBip9SoftFork;
    /** Any network and blockchain warnings. */
    warnings: string;
};

type BlockchainInfoSoftFork = {
    /** Name of softfork */
    id: string;
    /** Block version */
    version: number;
    reject: {
        // Progress toward rejecting pre-softfork blocks
        /** True if threshold reached */
        status: boolean;
    };
};

type BlockchainInfoBip9SoftFork = {
    [key: string]: {
        // name of the softfork
        /** Oone of \"defined\", \"started\", \"locked_in\", \"active\", \"failed\" */
        status: string;
        /** The bit (0-28) in the block version field used to signal this softfork (only for \"started\" status) */
        bit?: number;
        /** The minimum median time past of a block at which the bit gains its meaning */
        startTime: number;
        /** The median time past of a block at which the deployment is considered failed if not yet locked in */
        timeout: number;
        /** Height of the first block to which the status applies */
        since: number;
        statistics?: {
            // Numeric statistics about BIP9 signalling for a softfork (only for \"started\" status)
            /** The length in blocks of the BIP9 signalling period */
            period: number;
            /** The number of blocks with the version bit set required to activate the feature */
            threshold: number;
            /** The number of blocks elapsed since the beginning of the current period */
            elapsed: number;
            /** The number of blocks with the version bit set in the current period */
            count: number;
            /** Returns false if there are not enough blocks left in this period to pass activation threshold */
            possible: number;
        };
    };
};