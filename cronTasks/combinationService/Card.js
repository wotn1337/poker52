class Card {
  value;
  kind;
  inCombination = false;
  static values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "j",
    "q",
    "k",
    "a",
  ];
  static kinds = ["clubs", "diamonds", "hearts", "spades"];

  constructor(value, kind, inCombination) {
    this.value = value;
    this.kind = kind;
    this.inCombination = !!inCombination;
  }

  getValue() {
    return this.value;
  }

  getKind() {
    return this.kind;
  }

  getInCombination() {
    return this.inCombination;
  }

  setInCombination(inCombination) {
    this.inCombination = inCombination;
  }

  compare(card) {
    const cardValue = card.getValue();
    const thisValue = this.value;
    const cardValueNumber = Number(cardValue);
    const thisValueNumber = Number(thisValue);

    if (isNaN(cardValueNumber) && !isNaN(thisValueNumber)) {
      return -1;
    }

    if (!isNaN(cardValueNumber) && isNaN(thisValueNumber)) {
      return 1;
    }

    if (!isNaN(cardValueNumber) && !isNaN(thisValueNumber)) {
      return thisValueNumber - cardValueNumber;
    }

    if (isNaN(cardValueNumber) && isNaN(thisValueNumber)) {
      return Card.values.indexOf(thisValue) - Card.values.indexOf(cardValue);
    }

    return 0;
  }

  getNextValue() {
    if (this.value === "a") {
      return "2";
    }

    const valueIndex = Card.values.indexOf(this.value);
    return Card.values[valueIndex + 1];
  }

  static getRandomCard() {
    const valueIndex = Math.floor(Math.random() * this.values.length);
    const kindIndex = Math.floor(Math.random() * this.kinds.length);

    return {
      value: this.values[valueIndex],
      kind: this.kinds[kindIndex],
    };
  }
}

module.exports = { Card };
