let accounts;
let contract;
const BANKINFO_CONTRACT_ADDRESS ="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; 
const getlink = document.querySelector("#getInfo");

// createAccount..... 
const form = document.querySelector(".setForm");
const accNumber = document.querySelector("#accountNumber");
const bankName = document.querySelector("#bankName");
const branch = document.querySelector("#branch");
const balance = document.querySelector("#balance");

// depositing balance.....
const dform = document.querySelector(".depositForm");
const daccNumber = document.querySelector("#daccountNumber");
const dbalance = document.querySelector("#dbalance");

// depositing balance.....
const wform = document.querySelector(".withdrawForm");
const wNumber = document.querySelector("#withdrawNumber");
const wbalance = document.querySelector("#wbalance"); 

//function to connect to metamask wallet 
const connect = async () => {
    if (typeof window.ethereum == "undefined") {
        alert("Please Install Metamask");
    } else {
        accounts = await ethereum.request({ method: "eth_requestAccounts" });
    }
};
connect();

async function contractConnection() {
    const web3 = await new Web3(window.ethereum);
    contract = new web3.eth.Contract(
        CONTRACT_ABI,
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    );  
}
contractConnection();

// function to create Account
if (form != null) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        contract.methods
            .setInfo(
                accNumber.value,
                bankName.value,
                branch.value,
                balance.value
            )
            .send({ from: accounts[0] });
    });
  }
  else if (dform != null) {
    dform.addEventListener("submit", (e) => {
        e.preventDefault();
        contract.methods
            .deposit(
                daccNumber.value,        
                dbalance.value
            )
            .send({ from: accounts[0] });
    });
  }
  else if (wform != null) {
    wform.addEventListener("submit", (e) => {
        e.preventDefault();
        contract.methods
            .withdraw(
                wNumber.value,        
                wbalance.value
            )
            .send({ from: accounts[0] });
    });
}

// function to get personal Info
 else if (getlink != null) {
    getlink.addEventListener("click", async (e) => {
        e.preventDefault();
        const res = await contract.methods.getDataOfUser().call();
        for (let i = 0; i < res.length; i++) {
            document.write(res[i].accNumber + ' &nbsp' + ' &nbsp' + ' &nbsp' + ' &nbsp' + res[i].bankName + ' &nbsp' + ' &nbsp' + ' &nbsp' + ' &nbsp' + res[i].branch + ' &nbsp' + ' &nbsp' + ' &nbsp' + res[i].balance + ' &nbsp' + '</br>');
        }
    });
}

let CONTRACT_ABI=
[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "accountAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "accountNumber",
          "type": "uint256"
        }
      ],
      "name": "eventAccountCreation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "eventAdminChange",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "accountAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "accountNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "depositedBalance",
          "type": "uint256"
        }
      ],
      "name": "eventBalanceDeposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "accountFrom",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "accountTo",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "transferedBalance",
          "type": "uint256"
        }
      ],
      "name": "eventBalanceTransfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "accountAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "accountNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "withdrawlBalance",
          "type": "uint256"
        }
      ],
      "name": "eventBalanceWithdraw",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "arraybankdata",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "accNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "branch",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "arrayuserdata",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "accNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "bank_name",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "branch",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_accountNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_depositBalance",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_acno",
          "type": "uint256"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_name",
          "type": "uint256"
        }
      ],
      "name": "getDataOfBank",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "accNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "branch",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "internalType": "struct bankinfo.bankdata[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDataOfUser",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "accNumber",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bank_name",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "branch",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "internalType": "struct bankinfo.userdata[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "mappedbankaccount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "bank_name",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "branch",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_accountNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_bank",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_branch",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_balance",
          "type": "uint256"
        }
      ],
      "name": "setInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_fromAccountNo",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_transferBalance",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_toAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_toAccountNo",
          "type": "uint256"
        }
      ],
      "name": "tranferAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newAdminaddr",
          "type": "address"
        }
      ],
      "name": "transferOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_accountNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_withdrawBalance",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]



 



