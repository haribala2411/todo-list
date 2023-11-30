const solc = require('solc');
const path= require('path');
const fs = require('fs');

const contractPath = path.join(__dirname, 'MyContract.sol');
const sourceCode = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        ['MyContract.sol']: {
            content: sourceCode,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

const compileCode = JSON.parse(solc.compile(JSON.stringify(input)));

const bytecode = compileCode.contracts['MyContract.sol']['MyContract'].evm.bytecode.object;
const bytecodePath = path.join(__dirname, 'MyContractBytecode.bin');
fs.writeFileSync(bytecodePath, bytecode);

const abi = compileCode.contracts['MyContract.sol']['MyContract'].abi;
const abiPath = path.join(__dirname, 'MyContractABI.json');
fs.writeFileSync(abiPath, JSON.stringify(abi, null, '\t'));