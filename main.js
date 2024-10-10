const { detectArbitrageOpportunities } = require('./opportunityDetector');
const { executeArbitrageOpportunity } = require('./arbitrage');
const { getProvider } = require('./providerConfig');

async function main() {
    const chains = ['arbitrum', 'optimism', 'scroll', 'base', 'polygon']; // Liste des blockchains
    const token = 'USDC'; // Le token pour lequel on détecte des opportunités

    try {
        for (const chain of chains) {
            const provider = getProvider(chain); // Obtenir le provider pour chaque blockchain

            // Détection pour un arbitrage intra-chain (sur la même blockchain)
            const sameChainOpportunities = await detectArbitrageOpportunities(chain, token, false);
            if (sameChainOpportunities.length > 0) {
                for (const opportunity of sameChainOpportunities) {
                    await executeArbitrageOpportunity(opportunity, provider);
                }
            }

            // Détection pour un arbitrage cross-chain (entre différentes blockchains)
            const crossChainOpportunities = await detectArbitrageOpportunities(chain, token, true);
            if (crossChainOpportunities.length > 0) {
                for (const opportunity of crossChainOpportunities) {
                    await executeArbitrageOpportunity(opportunity, provider);
                }
            }
        }
    } catch (error) {
        console.error("Erreur dans le bot d'arbitrage : ", error.message);
    }
}

main();
