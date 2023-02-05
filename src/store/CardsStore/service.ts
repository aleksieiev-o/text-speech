import { Card, CardsStore, CreateCardRequestDto, UpdateCardRequestDto } from './index';
import { child, DataSnapshot, get, push, ref, remove, set, update } from 'firebase/database';
import { firebaseDataBase } from '../../firebase';

interface ICardsStoreService {
  cardsStore: CardsStore;
  loadAllCardsOnce: (parentId: string) => Promise<Array<Card>>;
  loadCardByIdOnce: (id: string, parentId: string) => Promise<Card>;
  createCard: (payload: CreateCardRequestDto) => Promise<Card>;
  removeCard: (id: string, parentId: string) => Promise<string>;
  removeAllCards: () => Promise<boolean>;
  updateCard: (id: string, payload: UpdateCardRequestDto) => Promise<Card>;
}

export class CardsStoreService implements ICardsStoreService {
  cardsStore: CardsStore;

  constructor(cardsStore: CardsStore) {
    this.cardsStore = cardsStore;
  }

  async loadAllCardsOnce(parentId: string): Promise<Array<Card>> {
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), `${this.cardsStore.cardsPath}/${parentId}`));
    // TODO complete the check
    // if (snapshot.exists()) {
    //   return snapshot.val();
    // }

    const result = snapshot.val() || {};
    return Promise.resolve(Object
      .keys(result)
      .map((key) => ({ ...result[key] })) || []);
  }

  async loadCardByIdOnce(id: string, parentId: string): Promise<Card> {
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), `${this.cardsStore.cardsPath}${parentId}/${id}`));
    // TODO complete the check
    // if (snapshot.exists()) {
    //   return snapshot.val();
    // }
    return snapshot.val();
  }

  async createCard(payload: CreateCardRequestDto): Promise<Card> {
    const { parentId, title, text } = payload;
    const cardRef = push(ref(firebaseDataBase, `${this.cardsStore.cardsPath}/${parentId}`));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cardId = cardRef.key!;

    const card: Card = {
      id: cardId,
      parentId,
      title,
      text,
      author: this.cardsStore.userUid,
      createdDate: new Date().toJSON(),
      updatedDate: new Date().toJSON(),
    };

    await set(cardRef, card);

    return await this.loadCardByIdOnce(cardId, parentId);
  }

  async removeCard(id: string, parentId: string): Promise<string> {
    await remove(child(ref(firebaseDataBase), `${this.cardsStore.cardsPath}${parentId}/${id}`));
    return Promise.resolve(id);
  }

  async removeAllCards(): Promise<boolean> {
    await set(ref(firebaseDataBase, this.cardsStore.cardsPath), null);
    return Promise.resolve(true);
  }

  async updateCard(id: string, payload: UpdateCardRequestDto): Promise<Card> {
    await update(child(ref(firebaseDataBase), `${this.cardsStore.cardsPath}/${payload.parentId}/${id}`), payload);
    return await this.loadCardByIdOnce(id, payload.parentId);
  }

}
