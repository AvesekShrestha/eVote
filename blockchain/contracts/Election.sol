// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


contract Election{

    struct Candidate{
        string name;
        uint256 electionId;
        string electionSymbol;
        uint256 voteRecived;
    }
    mapping(address => bool) private hasVoted;
    mapping (uint256 => Candidate) private candidate;
    uint256 totalCandidates = 0;

    function registerCandidate(string memory name , uint256 id , string memory symbol) public {
        Candidate memory newCandidate = Candidate({name : name , electionId : id , electionSymbol : symbol , voteRecived : 0});
        candidate[id] = newCandidate;
        totalCandidates += 1;
    }

    function getCandidate(uint256 id) public view returns(Candidate memory){
        require(id > 0 , "Invalid Id");
        return candidate[id];
    }

    function getAllCandidate() public view returns(Candidate[] memory){
        
        Candidate[] memory candidates = new Candidate[](totalCandidates);
        for(uint256 i = 1 ; i <= totalCandidates ; i++){
            candidates[i- 1] = candidate[i];
        }
        return candidates;
    }

    function vote(address voter, uint256 id) public {

        require(!hasVoted[voter] , "Already Voted");
        candidate[id].voteRecived += 1;
        hasVoted[voter] = true;

    }

    function findVote(uint256 id) public view returns(uint256){
        return candidate[id].voteRecived;
    }
    
    function checkVoted(address voter) public view returns (bool){
        return hasVoted[voter];
    }
}


