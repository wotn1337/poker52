const { Deck } = require("./Deck");

class Combination {
  static getCombinationExample(combination) {
    switch (combination) {
      case "HighCard": {
        return Combination.getHighCardExample();
      }
      case "OnePair": {
        return this.getPairExample();
      }
      case "TwoPair": {
        return this.getTwoPairsExample();
      }
      case "ThreeOfAKind": {
        return this.getThreeOfAKind();
      }
      case "Straight": {
        return this.getStraightExample();
      }
      case "Flush": {
        return this.getFlushExample();
      }
      case "FullHouse": {
        return this.getFullHouseExample();
      }
      case "FourOfAKind": {
        return this.getFourOfAKindExample();
      }
      case "StraightFlush": {
        return this.getStraightFlushExample();
      }
      case "RoyalFlush": {
        return this.getRoyalFlushExample();
      }
    }
  }

  static getHighCardExample() {
    const deck = new Deck();
    const first = deck.getCard();
    const firstValue = first.getValue();

    const second = deck.getCard(undefined, { values: [firstValue] });
    const secondValue = second.getValue();

    const third = deck.getCard(undefined, {
      values: [firstValue, secondValue],
    });
    const thirdValue = third.getValue();

    const fourth = deck.getCard(undefined, {
      values: [firstValue, secondValue, thirdValue],
    });
    const fourthValue = fourth.getValue();
    const fourthKind = fourth.getKind();

    const fifth = deck.getCard(undefined, {
      values: [firstValue, secondValue, thirdValue, fourthValue],
      kinds: [fourthKind],
    });

    const cards = [first, second, third, fourth, fifth];
    cards.sort((a, b) => -a.compare(b));
    cards[0].setInCombination(true);
    return cards;
  }

  static getPairExample() {
    const deck = new Deck();
    const first = deck.getCard();
    const firstValue = first.getValue();

    const second = deck.getCard({ values: [firstValue] });
    const secondValue = second.getValue();

    const third = deck.getCard(undefined, {
      values: [firstValue, secondValue],
    });
    const thirdValue = third.getValue();

    const fourth = deck.getCard(undefined, {
      values: [firstValue, secondValue, thirdValue],
    });
    const fourthValue = fourth.getValue();

    const fifth = deck.getCard(undefined, {
      values: [firstValue, secondValue, thirdValue, fourthValue],
    });

    first.setInCombination(true);
    second.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }

  static getTwoPairsExample() {
    const deck = new Deck();
    const first = deck.getCard();
    const firstValue = first.getValue();

    const second = deck.getCard({ values: [firstValue] });
    const secondValue = second.getValue();

    const third = deck.getCard(undefined, {
      values: [firstValue, secondValue],
    });
    const thirdValue = third.getValue();

    const fourth = deck.getCard({
      values: [thirdValue],
    });
    const fourthValue = fourth.getValue();

    const fifth = deck.getCard(undefined, {
      values: [firstValue, secondValue, thirdValue, fourthValue],
    });

    first.setInCombination(true);
    second.setInCombination(true);
    third.setInCombination(true);
    fourth.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }

  static getThreeOfAKind() {
    const deck = new Deck();
    const first = deck.getCard();
    const firstValue = first.getValue();

    const second = deck.getCard({ values: [firstValue] });
    const secondValue = second.getValue();

    const third = deck.getCard({
      values: [firstValue, secondValue],
    });
    const thirdValue = third.getValue();

    const fourth = deck.getCard(undefined, {
      values: [firstValue, secondValue, thirdValue],
    });
    const fourthValue = fourth.getValue();

    const fifth = deck.getCard(undefined, {
      values: [firstValue, secondValue, thirdValue, fourthValue],
    });

    first.setInCombination(true);
    second.setInCombination(true);
    third.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }

  static getStraightExample() {
    const deck = new Deck();
    const first = deck.getCard(undefined, {
      values: ["j", "q", "k"],
    });
    const second = deck.getCard({ values: [first.getNextValue()] });
    const third = deck.getCard({
      values: [second.getNextValue()],
    });
    const fourth = deck.getCard({
      values: [third.getNextValue()],
    });
    const fifth = deck.getCard(
      {
        values: [fourth.getNextValue()],
      },
      { kinds: [fourth.getKind()] }
    );

    first.setInCombination(true);
    second.setInCombination(true);
    third.setInCombination(true);
    fourth.setInCombination(true);
    fifth.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }

  static getFlushExample() {
    const deck = new Deck();
    const first = deck.getCard();
    const firstKind = first.getKind();

    const second = deck.getCard({ kinds: [firstKind] });
    const third = deck.getCard({ kinds: [firstKind] });
    const fourth = deck.getCard({ kinds: [firstKind] });
    const fifth = deck.getCard({ kinds: [firstKind] });

    first.setInCombination(true);
    second.setInCombination(true);
    third.setInCombination(true);
    fourth.setInCombination(true);
    fifth.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }

  static getFullHouseExample() {
    const deck = new Deck();
    const first = deck.getCard();
    const firstValue = first.getValue();

    const second = deck.getCard({ values: [firstValue] });

    const third = deck.getCard(undefined, { values: [firstValue] });
    const thirdValue = third.getValue();
    const fourth = deck.getCard({ values: [thirdValue] });
    const fifth = deck.getCard({ values: [thirdValue] });

    first.setInCombination(true);
    second.setInCombination(true);
    third.setInCombination(true);
    fourth.setInCombination(true);
    fifth.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }

  static getFourOfAKindExample() {
    const deck = new Deck();
    const first = deck.getCard();
    const firstValue = first.getValue();

    const second = deck.getCard({ values: [firstValue] });
    const third = deck.getCard({ values: [firstValue] });
    const fourth = deck.getCard({ values: [firstValue] });
    const fifth = deck.getCard(undefined, { values: [firstValue] });

    first.setInCombination(true);
    second.setInCombination(true);
    third.setInCombination(true);
    fourth.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }

  static getStraightFlushExample() {
    const deck = new Deck();
    const first = deck.getCard(undefined, {
      values: ["10", "j", "q", "k"],
    });
    const firstKind = first.getKind();

    const second = deck.getCard({
      values: [first.getNextValue()],
      kinds: [firstKind],
    });

    const third = deck.getCard({
      values: [second.getNextValue()],
      kinds: [firstKind],
    });

    const fourth = deck.getCard({
      values: [third.getNextValue()],
      kinds: [firstKind],
    });

    const fifth = deck.getCard({
      values: [fourth.getNextValue()],
      kinds: [firstKind],
    });

    first.setInCombination(true);
    second.setInCombination(true);
    third.setInCombination(true);
    fourth.setInCombination(true);
    fifth.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }

  static getRoyalFlushExample() {
    const deck = new Deck();
    const first = deck.getCard({ values: ["10"] });
    const firstKind = first.getKind();

    const second = deck.getCard({
      values: [first.getNextValue()],
      kinds: [firstKind],
    });

    const third = deck.getCard({
      values: [second.getNextValue()],
      kinds: [firstKind],
    });

    const fourth = deck.getCard({
      values: [third.getNextValue()],
      kinds: [firstKind],
    });

    const fifth = deck.getCard({
      values: [fourth.getNextValue()],
      kinds: [firstKind],
    });

    first.setInCombination(true);
    second.setInCombination(true);
    third.setInCombination(true);
    fourth.setInCombination(true);
    fifth.setInCombination(true);
    const cards = [first, second, third, fourth, fifth];

    return cards;
  }
}

module.exports = { Combination };
