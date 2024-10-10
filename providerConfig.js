const { ethers } = require('ethers');
const { ZkSync } = require('zksync/build/typechain');
// Ta clé Infura (définie une seule fois)
const INFURA_KEY = '1651f222c1a94e729e79113295b514b5';

// Mapping des URL Infura spécifiques à chaque blockchain SEPOLIA
const RPC_URLS = {
        'arbitrum': `https://arbitrum-sepolia.infura.io/v3/${INFURA_KEY}`,
        'optimism': `https://optimism-sepolia.infura.io/v3/${INFURA_KEY}`,
        'scroll': `https://scroll-sepolia.infura.io/v3/${INFURA_KEY}`,
        'base': `https://base-sepolia.infura.io/v3/${INFURA_KEY}`,
        'polygon': `https://polygon-sepolia.infura.io/v3/${INFURA_KEY}`,
        'blast' : `https://blast-sepolia.infura.io/v3/${INFURA_KEY}`,
        'linea' : `https://linea-sepolia.infura.io/v3/${INFURA_KEY}`,
        'zksync' : `https://zksync-sepolia.infura.io/v3/${INFURA_KEY}`
    };

    const getProvider = (chain) => {
        const rpcUrl = RPC_URLS[chain];
        
        if (!rpcUrl) {
            throw new Error(`Blockchain non supportée : ${chain}`);
        }
    
        return new ethers.providers.JsonRpcProvider(rpcUrl);
    };

module.exports = { getProvider };
