import { RootStore } from '../index';
import { CardsStoreService } from './service';
import { makeAutoObservable } from 'mobx';

export interface CreateCardRequestDto {
  parentId: string;
  title: string;
  text: string;
  textLang: string;
  voiceURI: string;
}

export interface UpdateCardRequestDto {
  parentId: string;
  title?: string;
  text?: string;
  textLang?: string;
  voiceURI?: string;
}

export interface Card {
  id: string;
  parentId: string;
  title: string;
  text: string;
  author: string;
  textLang: string;
  voiceURI: string;
  createdDate: string;
  updatedDate: string;
}

interface ICardsStore {
  rootStore: RootStore;
  cardsStoreService: CardsStoreService;
  cardsList: Map<string, Array<Card>>;
  currentCardsList: Array<Card>;
  currentCard: Card;
  loadAllCards: (parentId: string) => void;
  loadCardById: (id: string, parentId: string) => void;
  createCard: (payload: CreateCardRequestDto) => void;
  removeCard: (id: string, parentId: string) => void;
  removeAllCards: (parentId: string) => void;
  updateCard: (id: string, payload: UpdateCardRequestDto) => void;
}

export class CardsStore implements ICardsStore {
  rootStore: RootStore;
  cardsStoreService: CardsStoreService;
  cardsList: Map<string, Array<Card>>;
  currentCardsList: Array<Card>;
  currentCard: Card;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.cardsStoreService = new CardsStoreService(this);
    this.cardsList = new Map<string, Array<Card>>();
    this.currentCardsList = [];
    this.currentCard = {} as Card;

    makeAutoObservable(this);
  }

  async loadAllCards(parentId: string) {
    if (!this.cardsList.has(parentId)) {
      const cardList = await this.cardsStoreService.loadAllCardsOnce(parentId);
      this.cardsList.set(parentId, cardList);
    }

    this.currentCardsList = this.cardsList.get(parentId) || [];
  }

  async loadCardById(id: string, parentId: string) {
    this.currentCard = await this.cardsStoreService.loadCardByIdOnce(id, parentId);
  }

  async createCard(payload: CreateCardRequestDto) {
    const collection = await this.cardsStoreService.createCard(payload);
    this.currentCardsList.push(collection);
    this.cardsList.set(payload.parentId, this.currentCardsList);
  }

  async removeCard(id: string, parentId: string) {
    await this.cardsStoreService.removeCard(id, parentId);
    const deletedIdx = this.currentCardsList.findIndex((item) => item.id === id);
    this.currentCardsList.splice(deletedIdx, 1);
    this.cardsList.set(parentId, this.currentCardsList);
  }

  async removeAllCards(parentId: string) {
    await this.cardsStoreService.removeAllCards(parentId);
    this.currentCardsList = [];
    this.cardsList.delete(parentId);
  }

  async updateCard(id: string, payload: UpdateCardRequestDto) {
    const updatedCard: Card = await this.cardsStoreService.updateCard(id, payload);
    const updatedIdx = this.currentCardsList.findIndex((item) => item.id === id);
    this.currentCardsList[updatedIdx] = updatedCard;
    this.cardsList.set(payload.parentId, this.currentCardsList);
  }

  get currentCardsListSize(): number {
    return this.currentCardsList.length;
  }

  get userUid(): string {
    return this.rootStore.authorizationStore.userUid;
  }

  get cardsPath(): string {
    return `${this.userUid}/cards`;
  }
}
