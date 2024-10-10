const ethers = require('ethers');

async function checkAndRefillGas(wallet, threshold = ethers.utils.parseUnits('0.005', 'ether')) {
    const balance = await wallet.getBalance();

    if (balance.lt(threshold)) {
        console.log(`Solde insuffisant pour le gaz. Recharge de gaz nécessaire.`);
        // Logique pour effectuer un swap de stablecoin vers ETH ou un autre jeton natif
        // Utiliser une fonction swapTokensOnDex avec ETH comme tokenOut
    } else {
        console.log(`Solde de gaz suffisant: ${ethers.utils.formatUnits(balance, 'ether')} ETH`);
    }
}

module.exports = { checkAndRefillGas };
