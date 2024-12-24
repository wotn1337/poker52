const { Card } = require("./Card");

class Deck {
  cards = [];

  constructor() {
    Card.values.forEach((value) => {
      Card.kinds.forEach((kind) => {
        this.cards.push(new Card(value, kind));
      });
    });
  }

  getCards() {
    return this.cards;
  }

  getCard(toBe, notToBe) {
    let cards = this.cards;

    function toBeFilter(card) {
      const isRightKind = toBe?.kinds?.includes(card.getKind()) ?? true;
      const isRightValue = toBe?.values?.includes(card.getValue()) ?? true;
      return isRightKind && isRightValue;
    }

    function notToBeFilter(card) {
      const isRightKind = !(notToBe?.kinds?.includes(card.getKind()) ?? false);
      const isRightValue = !(
        notToBe?.values?.includes(card.getValue()) ?? false
      );
      return isRightKind && isRightValue;
    }

    function cardFilter(card) {
      return toBeFilter(card) && notToBeFilter(card);
    }

    cards = cards.filter(cardFilter);
    const cardsLength = cards.length;
    if (!cardsLength) {
      return undefined;
    }
    const index = Math.floor(Math.random() * cardsLength);
    const card = cards[index];
    const cardIndexInDeck = this.cards.indexOf(card);

    return this.cards.splice(cardIndexInDeck, 1)[0];
  }
}

module.exports = { Deck };
