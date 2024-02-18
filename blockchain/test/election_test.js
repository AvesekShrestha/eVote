const { ethers } = require("hardhat")
const { expect } = require("chai")

describe("Election Contract", () => {

    let contract;
    beforeEach(async () => {
        const factory = await ethers.getContractFactory("Election");
        contract = await factory.deploy();
    })

    it("register function should successfully register the candidate", async () => {

        await contract.registerCandidate("Avesek", 1, "CML");

        const candidate = await contract.getCandidate(1);
        expect(candidate.name).to.equal("Avesek")
        expect(candidate.electionId).to.equal(1)
        expect(candidate.electionSymbol).to.equal("CML")

    })

    it("getAllCandidate function should return list of candiates", async () => {

        await contract.registerCandidate("Avesek", 1, "CML");

        const candidateList = await contract.getAllCandidate();
        console.log(candidateList.length)

        for (let i = 0; i < candidateList.length; i++) {
            console.log(`Candidate Name: ${candidateList[i].name}`)
            console.log(`Candidate Id: ${candidateList[i].electionId}`)
            console.log(`Candidate Symbol: ${candidateList[i].electionSymbol}`)
        }
    })

    it("Vote function should increment voteRecived property of respective candidate", async () => {
        await contract.registerCandidate("Avesek", 1, "CML")
        await contract.vote("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 1);

        const vote = await contract.findVote(1);
        expect(vote).to.equal(1);

        const candidateList = await contract.getAllCandidate();
        console.log("Candidate list are:")
        for (let i = 0; i < candidateList.length; i++) {
            console.log(`Candidate Name: ${candidateList[i].name}`)
            console.log(`Candidate Vote: ${candidateList[i].voteRecived}`)
        }
    })
})

