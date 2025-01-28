import { expect } from "chai"; // Import the expect function
import { ethers } from "hardhat"; // Import the ethers object
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"; // Import the SignerWithAddress type
import { SemaToken } from "../typechain-types"; // Import the typechain type

describe("SemaToken", () => {
  let semaToken: SemaToken;
  let admin: SignerWithAddress;
  let minter: SignerWithAddress;
  let user: SignerWithAddress;

  const TOKEN_NAME = "Sema Token";
  const TOKEN_SYMBOL = "SEMA";

  beforeEach(async () => {
    // Deploy a fresh contract before each test
    [admin, minter, user] = await ethers.getSigners();

    const SemaTokenFactory = await ethers.getContractFactory("SemaToken");
    semaToken = await SemaTokenFactory.deploy(
      TOKEN_NAME,
      TOKEN_SYMBOL,
      admin.address
    );
  });

  //Deployment Tests
  describe("Deployment", () => {
    it("should set correct name and symbol", async () => {
      expect(await semaToken.name()).to.equal(TOKEN_NAME);
      expect(await semaToken.symbol()).to.equal(TOKEN_SYMBOL);
    });

    it("should grant ADMIN and MINTER roles to admin", async () => {
      expect(await semaToken.hasRole(await semaToken.DEFAULT_ADMIN_ROLE(), admin.address)).to.be.true;
      expect(await semaToken.hasRole(await semaToken.MINTER_ROLE(), admin.address)).to.be.true;
    });
  });

  // --- Minting Tests ---
  describe("Minting", () => {
    it("should allow minter to mint tokens", async () => {
      const amount = ethers.parseEther("100");
      await semaToken.connect(admin).mint(user.address, amount);

      expect(await semaToken.balanceOf(user.address)).to.equal(amount);
    });

    it("should revert if non-minter tries to mint", async () => {
      const amount = ethers.parseEther("100");
      await expect(
        semaToken.connect(user).mint(user.address, amount)
      ).to.be.revertedWithCustomError(semaToken, "AccessControlUnauthorizedAccount");
    });
  });

  // --- Burning Tests ---
  describe("Burning", () => {
    it("should allow users to burn their own tokens", async () => {
      const mintAmount = ethers.parseEther("100");
      const burnAmount = ethers.parseEther("50");

      await semaToken.connect(admin).mint(user.address, mintAmount);
      await semaToken.connect(user).burn(burnAmount);

      expect(await semaToken.balanceOf(user.address)).to.equal(mintAmount - burnAmount);
    });
  });

  // --- Role Management Tests ---
  describe("Role Management", () => {
    it("should allow admin to grant MINTER role", async () => {
      await semaToken.connect(admin).grantRole(await semaToken.MINTER_ROLE(), minter.address);
      expect(await semaToken.hasRole(await semaToken.MINTER_ROLE(), minter.address)).to.be.true;
    });

    it("should allow admin to revoke MINTER role", async () => {
      await semaToken.connect(admin).grantRole(await semaToken.MINTER_ROLE(), minter.address);
      await semaToken.connect(admin).revokeRole(await semaToken.MINTER_ROLE(), minter.address);
      expect(await semaToken.hasRole(await semaToken.MINTER_ROLE(), minter.address)).to.be.false;
    });

    it("should revert if non-admin tries to grant roles", async () => {
      await expect(
        semaToken.connect(user).grantRole(await semaToken.MINTER_ROLE(), minter.address)
      ).to.be.revertedWithCustomError(semaToken, "AccessControlUnauthorizedAccount");
    });
  });
});