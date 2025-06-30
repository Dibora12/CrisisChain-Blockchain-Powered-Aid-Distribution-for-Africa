
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AidToken", function () {
  let AidToken;
  let aidToken;
  let owner;
  let verifier;
  let recipient;
  let addrs;

  beforeEach(async function () {
    [owner, verifier, recipient, ...addrs] = await ethers.getSigners();

    AidToken = await ethers.getContractFactory("AidToken");
    aidToken = await AidToken.deploy(
      "Test Aid Token",
      "TAT",
      1000000,
      owner.address
    );
    await aidToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await aidToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await aidToken.balanceOf(owner.address);
      expect(await aidToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Verifier Management", function () {
    it("Should allow owner to add verifiers", async function () {
      await aidToken.addVerifier(verifier.address);
      expect(await aidToken.verifiers(verifier.address)).to.be.true;
    });

    it("Should not allow non-owner to add verifiers", async function () {
      await expect(
        aidToken.connect(verifier).addVerifier(recipient.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Aid Distribution", function () {
    beforeEach(async function () {
      await aidToken.addVerifier(verifier.address);
      await aidToken.connect(recipient).requestAid(1000);
    });

    it("Should allow verifiers to distribute aid", async function () {
      await aidToken.connect(verifier).distributeAid(recipient.address, 1000);
      expect(await aidToken.balanceOf(recipient.address)).to.equal(1000);
    });

    it("Should not allow non-verifiers to distribute aid", async function () {
      await expect(
        aidToken.connect(recipient).distributeAid(recipient.address, 1000)
      ).to.be.revertedWith("Not authorized verifier");
    });
  });
});
