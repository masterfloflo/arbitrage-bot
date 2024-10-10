const axios = require('axios');

async function bridgeTokensWithJumper(opportunity) {
    try {
        console.log(`Tentative de bridge des tokens avec Jumper sur ${opportunity.chain}`);

        // Appel à l'API de Jumper pour exécuter le bridge
        const response = await axios.post('https://jumper-api.com/bridgeTokens', {
            fromChain: opportunity.fromChain,
            toChain: opportunity.toChain,
            token: opportunity.token,
            amount: opportunity.amount
        });

        if (response.data.success) {
            console.log('Bridge réussi avec Jumper.');
            return true;
        } else {
            console.log('Bridge échoué avec Jumper.');
            return false;
        }
    } catch (error) {
        console.error(`Erreur lors du bridge avec Jumper : ${error.message}`);
        return false;
    }
}

module.exports = { bridgeTokensWithJumper };