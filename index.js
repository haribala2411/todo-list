const fs = require('fs');
const path = require('path');

const { Web3 } = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

const deployedAddressPath = path.join(__dirname, 'MyContractAddress.bin');
const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8');

const abi = require('./MyContractABI.json');
const myContract = new web3.eth.Contract(abi, deployedAddress);
myContract.handleRevert = true;

async function createTask(task) {
    const providersAccounts = await web3.eth.getAccounts();
    const defaultAccount = providersAccounts[0];

    try {
        const result = await myContract.methods.createTask(task).send({
            from: defaultAccount,
            gas: 1000000,
            gasPrice: 10000000000,
        });
        console.log(result.transactionHash);
    } catch (error) {
        console.error(error);
    }
}

async function updateTaskStatus(id) {
    const providersAccounts = await web3.eth.getAccounts();
    const defaultAccount = providersAccounts[0];

    try {
        const result = await myContract.methods.updateTaskStatus(id).send({
            from: defaultAccount,
            gas: 1000000,
            gasPrice: 10000000000,
        });
        console.log(result.transactionHash);
    } catch (error) {
        console.error(error);
    }
}

async function getTasks() {
    try {
        const result = await myContract.methods.getTasks().call();
        const dataPath = path.join(__dirname, 'data.json');
        fs.writeFileSync(dataPath, JSON.stringify(result, null, '\t'));
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error);
    }
}

// function appendTransactionHash(hash) {
//     const outputDiv = document.getElementById("output");
//     const pTag = document.createElement("p");
//     pTag.textContent = `Transaction Hash: ${hash}`;
//     outputDiv.appendChild(pTag);
// }

// function appendError(errorMessage) {
//     const outputDiv = document.getElementById("output");
//     const pTag = document.createElement("p");
//     pTag.textContent = `Error: ${errorMessage}`;
//     outputDiv.appendChild(pTag);
// }

module.exports = {
    createTask,
    updateTaskStatus,
    getTasks
}