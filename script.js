var getMood;
var setMood;

import {
    createWalletClient,
    custom,
    getContract,
  } from "https://esm.sh/viem";

import { sepolia } from "https://esm.sh/viem/chains";

const walletClient=createWalletClient({
  chain:sepolia,
  transport:custom(window.ethereum),
});

const accounts=await walletClient.requestAddresses();

const [address]=accounts;
console.log(address);

const MoodContractAddress="0xB9A8b278a6e65f10aC0b8EEBDb58831a78e7D0E4";
const MoodContractABI=[
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const MoodContractInstance=getContract({
	address:MoodContractAddress,
	abi:MoodContractABI,
	client:walletClient,
});

getMood=async function () {
	const mood=await MoodContractInstance.read.getMood();
	document.getElementById("showmood").innerText=`Your current Mood:${mood}`;
}

setMood=async function() {
	const mood=document.getElementById("mood").value;
	await MoodContractInstance.write.setMood([mood],{account:address});
	document.getElementById("showmood").innerText=`Your mood has been set to:${mood}`;
}
window.getMood=getMood;
window.setMood=setMood;