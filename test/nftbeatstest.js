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
            await nftb.registerArtist("JZX", { from: currentAcc });
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

    describe("Listing track for sale/auction", async () => {
        let event;

        before(async () => {
            await nftb.createTrack("Test", "fweig23385t3dfa", { from: currentAcc });
            const result = await nftb.setPrice(1, web3.utils.toWei("0.5", "Ether"), { from: currentAcc });
            event = result.logs[0].args;
        })

        it("can set new price", async () => {
            assert.equal(web3.utils.fromWei(event.newPrice.toString(), "Ether"), 0.5);
        })

        it("listed for sale", async () => {
            assert.equal(event.listed, true);
        })
    })

    describe("Approve offers", async () => {
        let buyer, event;

        before(async () => {
            buyer = accounts[1];
            await nftb.makeOffer(1, web3.utils.toWei("0.6", "Ether"), { from: buyer });
            const result = await nftb.approveOffer(1, { from: currentAcc });
            event = result.logs[1].args;
        })

        it("approves transfer to bidder", async () => {
            const approvedAddr = await nftb.getApproved(1);
            assert.equal(approvedAddr, buyer);
        })

        it("approves offer", async () => {
            assert.equal(event.id, 1);
            assert.equal(event.trackID, 1);
            assert.equal(web3.utils.fromWei(event.amount.toString(), "Ether"), 0.6);
            assert.equal(event.approved, true);
        })
    })

    describe("Purchase NFT tracks", async () => {
        let b1, buyer, event;

        before(async () => {
            b1 = await web3.eth.getBalance(currentAcc);
            buyer = accounts[1];
            const result = await nftb.buyTrack(1, { from: buyer, value: web3.utils.toWei("0.6", "Ether") });
            event = result.logs[2].args;
        })

        it("pays the owner", async () => {
            const b2 = await web3.eth.getBalance(currentAcc);
            assert.equal((web3.utils.fromWei(b2.toString()) - web3.utils.fromWei(b1.toString())) >= 0.59, true);
        })

        it("transfers the NFT", async () => {
            assert.equal(event.id.toNumber(), 1);
            assert.equal(event.buyer, buyer);
            const newOwner = await nftb.ownerOf(1);
            assert.equal(newOwner, buyer);
        })
    })

    describe("Verify track creator", async () => {
        it("verifies correct creator", async () => {
            const res = await nftb.verifyCreator(1);
            assert.equal(res[0], "JZX");
            assert.equal(res[1], currentAcc);
        })
    })
})