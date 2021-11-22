import rangePush from "public/data/range-push.json";

const suits = ["c", "d", "h", "s"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

const product = (array1: string[], array2: string[]) => {
    const result: string[] = [];
    array1.forEach((value1) =>
        array2.forEach((value2) => result.push(value1 + value2))
    );
    return result;
};

const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

class Card {
    card: string;
    rank: string;
    suit: string;
    constructor(card: string) {
        this.card = card;
        this.rank = card[0];
        this.suit = card[1];
    }
    lt(card: Card) {
        return ranks.indexOf(this.rank) < ranks.indexOf(card.rank);
    }
    gt(card: Card) {
        return ranks.indexOf(this.rank) > ranks.indexOf(card.rank);
    }
    eq(card: Card) {
        return ranks.indexOf(this.rank) === ranks.indexOf(card.rank);
    }
}

export interface HandType {
    getFirst: () => string;
    getSecond: () => string;
    toAtomicFormat: () => string;
}

export class Hand implements HandType {
    first;
    second;
    constructor(card1: string, card2: string) {
        this.first = new Card(card1);
        this.second = new Card(card2);
    }
    isSuited() {
        return this.first.suit === this.second.suit;
    }
    toAtomicFormat() {
        if (this.first.eq(this.second)) {
            return `${this.first.rank}${this.second.rank}`;
        } else if (this.first.lt(this.second)) {
            return `${this.second.rank}${this.first.rank}${
                this.isSuited() ? "s" : "o"
            }`;
        } else {
            return `${this.first.rank}${this.second.rank}${
                this.isSuited() ? "s" : "o"
            }`;
        }
    }
    getFirst() {
        return this.first.card;
    }
    getSecond() {
        return this.second.card;
    }
}

export interface DeckType {
    make_random: () => void;
    draw: () => string;
}

export class Deck implements DeckType {
    cards;
    constructor() {
        this.cards = product(ranks, suits);
    }
    make_random() {
        shuffle(this.cards);
    }
    draw() {
        return this.cards.pop() as string;
    }
}

export const getRange = (stack: number) => {
    const ranks = [
        "A",
        "K",
        "Q",
        "J",
        "T",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
    ];
    const matrix = ranks.map((valueY, y) =>
        ranks.map((valueX, x) =>
            x > y
                ? `${valueY}${valueX}s`
                : `${valueX}${valueY}${x !== y ? "o" : ""}`
        )
    );
    return Array.prototype.concat.apply(
        [],
        matrix.map((line, y) =>
            line.filter((value, x) => rangePush[y][x] >= stack)
        )
    );
};
