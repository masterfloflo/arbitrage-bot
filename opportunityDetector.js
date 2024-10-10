const axios = require('axios');

// Paramètres de configuration de l'arbitrage
const MIN_PROFIT_SAME_CHAIN = 0.01;  // Marge minimale de 1 % pour une même blockchain
const MIN_PROFIT_CROSS_CHAIN = 0.015; // Marge minimale de 1,5 % pour un arbitrage entre deux blockchains
const GAS_THRESHOLD = 4; // Seuil des frais de gas en USD
const BRIDGE_FEES_THRESHOLD = 10; // Seuil des frais de bridge en USD (à adapter)

// Fonction pour détecter les opportunités d'arbitrage via Jumper
async function detectArbitrageOpportunities(chain, token, crossChain = false) {
    try {
        console.log(`Recherche des opportunités d'arbitrage sur ${chain} pour le token ${token}`);

        // Appel à l'API Jumper pour obtenir les opportunités d'arbitrage
        const response = await axios.get('https://jumper-api.com/detectOpportunities', {
            params: {
                chain: chain,
                token: token,
            },
        });

        const opportunities = response.data.opportunities || [];
        
        // Appliquer les filtres de rentabilité
        const filteredOpportunities = opportunities.filter(opportunity => {
            // Calcul de la marge potentielle
            const profitMargin = calculateProfitMargin(opportunity);

            if (crossChain) {
                // Vérification des critères pour un arbitrage inter-blockchains
                return profitMargin >= MIN_PROFIT_CROSS_CHAIN && opportunity.bridgeFees <= BRIDGE_FEES_THRESHOLD && opportunity.gasCost <= GAS_THRESHOLD;
            } else {
                // Vérification des critères pour un arbitrage sur la même blockchain
                return profitMargin >= MIN_PROFIT_SAME_CHAIN && opportunity.gasCost <= GAS_THRESHOLD;
            }
        });

        // Retourner uniquement les opportunités filtrées
        if (filteredOpportunities.length > 0) {
            console.log(`Opportunités rentables détectées sur ${chain} :`, filteredOpportunities);
        } else {
            console.log(`Aucune opportunité rentable trouvée sur ${chain}.`);
        }

        return filteredOpportunities;
    } catch (error) {
        console.error(`Erreur lors de la détection des opportunités d'arbitrage sur ${chain} :`, error.message);
        return [];
    }
}

// Fonction pour calculer la marge potentielle (profitabilité)
function calculateProfitMargin(opportunity) {
    const priceDifference = opportunity.sellPrice - opportunity.buyPrice;
    return priceDifference / opportunity.buyPrice;
}

module.exports = { detectArbitrageOpportunities };
