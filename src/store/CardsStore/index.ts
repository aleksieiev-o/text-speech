import { RootStore } from '../index';
import { CardsStoreService } from './service';
import { makeAutoObservable } from 'mobx';

export interface CreateCardRequestDto {
  parentId: string,
  title: string,
  text: string
}

export interface UpdateCardRequestDto {
  parentId: string,
  title?: string,
  text?: string
}

export interface Card {
  id: string;
  parentId: string;
  title: string;
  text: string;
  author: string;
  createdDate: string;
  updatedDate: string;
}

interface ICardsStore {
  rootStore: RootStore;
  cardsStoreService: CardsStoreService;
  cards: Array<Card>;
  loadAllCards: (parentId: string) => void;
  createCard: (payload: CreateCardRequestDto) => void;
  removeCard: (id: string, parentId: string) => void;
  removeAllCards: (parentId: string) => void;
  updateCard: (id: string, payload: UpdateCardRequestDto) => void;
  clearLocalCards: () => void;
}

export class CardsStore implements ICardsStore {
  rootStore: RootStore;
  cardsStoreService: CardsStoreService;
  cards: Array<Card>;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.cardsStoreService = new CardsStoreService(this);
    this.cards = [];

    makeAutoObservable(this);
  }

  async loadAllCards(parentId: string) {
    this.cards = await this.cardsStoreService.loadAllCardsOnce(parentId);
  }

  async createCard(payload: CreateCardRequestDto) {
    const collection = await this.cardsStoreService.createCard(payload);
    this.cards.push(collection);
  }

  async removeCard(id: string, parentId: string) {
    await this.cardsStoreService.removeCard(id, parentId);
    const deletedIdx = this.cards.findIndex((item) => item.id === id);
    this.cards.splice(deletedIdx, 1);
  }

  async removeAllCards(parentId: string) {
    await this.cardsStoreService.removeAllCards(parentId);
    this.cards = [];
  }

  async updateCard(id: string, payload: UpdateCardRequestDto) {
    const updatedCard: Card = await this.cardsStoreService.updateCard(id, payload);
    const updatedIdx = this.cards.findIndex((item) => item.id === id);
    this.cards[updatedIdx] = updatedCard;
  }

  clearLocalCards() {
    this.cards = [];
  }

  get userUid(): string {
    return this.rootStore.authorizationStore.userUid;
  }

  get cardsPath() {
    return `${this.userUid}/cards`;
  }
}
