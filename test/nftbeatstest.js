const NFTbeats = artifacts.require("NFTbeats");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract("Nfto", async (accounts) => {
    let nftb, currentAcc;

    before(async() => {
        nftb = await NFTbeats.deployed();
        currentAcc = accounts[0];
    })

    describe("Contract deployment", async () => {
        it("contract deploys successfully", async() => {
            const address = await nftb.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })

        it("contract has correct name", async () => {
            const cName = await nftb.name();
            assert.equal(cName, "NFTbeats");
        })
    })

    describe("Minting NFT tracks", async () => {
        let event, b1, b2;

        before(async () => {
            b1 = await nftb.balanceOf(currentAcc);
            const result = await nftb.createTrack("Test", "fweig23385t3dfa", { from: currentAcc });
            event = result.logs[1].args;
            b2 = await nftb.balanceOf(currentAcc);
        })

        it("creates new track", async () => {
            assert.equal(event.id.toNumber(), 1);
            assert.equal(event.name, "Test");
            assert.equal(event.owner, currentAcc);
        })

        it("correct token balance", async () => {
            assert.equal(b2.toNumber() - b1.toNumber(), 1);
        })
    })

    describe("Listing track for sale", async () => {
        let event;

        before(async () => {
            await nftb.createTrack("Test", "fweig23385t3dfa", { from: currentAcc });
            const result = await nftb.setPrice(1, web3.utils.toWei("0.5", "Ether"), { from: currentAcc });
            event = result.logs[1].args;
        })

        it("can set new price", async () => {
            assert.equal(web3.utils.fromWei(event.newPrice.toString(), "Ether"), 0.5);
        })

        it("listed for sale", async () => {
            assert.equal(event.listed, true);
        })

        it("approves contract for transfer", async () => {
            const approvedAddr = await nftb.getApproved(1);
            assert.equal(approvedAddr, nftb.address);
        })
    })

    describe("Purchase NFT tracks", async () => {
        let b1, buyer;

        before(async () => {
            b1 = await web3.eth.getBalance(currentAcc);
            buyer = accounts[1];
            await nftb.buyTrack(1, { from: buyer, value: web3.utils.toWei("0.5", "Ether") });
        })

        it("pays the owner", async () => {
            const b2 = await web3.eth.getBalance(currentAcc);
            assert.equal(web3.utils.fromWei(b2.toString()) - web3.utils.fromWei(b2.toString(), 0.5));
        })
    })
})