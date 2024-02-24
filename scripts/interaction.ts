import { ethers } from "hardhat";

async function main() {

  const W3XTokenAddress = "0x860E0FE704b30F62959B876601c420F97d41D757";
  const SavingContractAddress = "0xd0aff61c6796143c01430dc513ab82a37B583bbF";

  const SavingsContract = await ethers.getContractAt("ISaveERC20", SavingContractAddress);
    const StakingToken = await ethers.getContractAt("IW3XToken", W3XTokenAddress);

    const depositAmount = ethers.parseUnits("1000", 18);

    const approveTx = await StakingToken.approve(SavingContractAddress, depositAmount);
    await approveTx.wait();

    const saveTx = await SavingsContract.deposit(depositAmount);
    await saveTx.wait();

    const amountUserSavedInContract = await SavingsContract.checkUserBalance("0x5b338a22Edef630d29e4B3728293bbfE9A25B6BA");

    console.log("User contract balance: ",amountUserSavedInContract);

    const amountInSavingContract = await SavingsContract.checkContractBalance();

    console.log("Amount saved in contract: ", amountInSavingContract);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
