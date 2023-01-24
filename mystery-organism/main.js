// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

let cAndGPercentage;

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate() {
      let newBase = returnRandBase();
      let randomDnaIndex = Math.floor(Math.random() * 15);
      if (this.dna[randomDnaIndex] !== newBase) {
        this.dna[randomDnaIndex] = newBase;
      }
      return this.dna;
    },
    compareDNA(pAequor) {
      let identical = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] == pAequor.dna[i]) {
          identical++;
        }
      }
      let percentage = (identical / 15) * 100;
      return `specimen #${this.specimenNum} and specimen #${
        pAequor.specimenNum
      } have ${percentage.toFixed(1)}% DNA in common`;
    },
    willLikelySurvive() {
      let dnaC = 0;
      let dnaG = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C") {
          dnaC++;
        }
        if (this.dna[i] === "G") {
          dnaG++;
        }
      }
      cAndGPercentage = ((dnaC + dnaG) / 15) * 100;
      if (cAndGPercentage >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

let pAequorToStudy = [];
let studyCount = 0;
for (let i = 0; pAequorToStudy.length <= 30; i++) {
  let pAequor = pAequorFactory(studyCount, mockUpStrand());
  if (pAequor.willLikelySurvive()) {
    pAequorToStudy.push(pAequor);
    studyCount++;
  }
}

console.log(pAequorToStudy);
