const { bridgeTokensWithJumper } = require('./jumperBridge');

async function executeArbitrageOpportunity(opportunity, provider) {
    try {
        console.log(`Exécution de l'opportunité sur ${opportunity.chain}`);
        
        // Exécuter le swap et le bridge via Jumper
        const success = await bridgeTokensWithJumper(opportunity);

        if (success) {
            console.log("Arbitrage exécuté avec succès !");
        } else {
            console.log("Échec de l'arbitrage.");
        }
    } catch (error) {
        console.error(`Erreur lors de l'exécution de l'arbitrage : ${error.message}`);
    }
}

module.exports = { executeArbitrageOpportunity };