import { Resource } from 'i18next';

import commonEN from './EN/common.json';
import commonRU from './RU/common.json';

import authorizationEN from './EN/authorization.json';
import authorizationRU from './RU/authorization.json';

import collectionsListEN from './EN/collectionsList.json';
import collectionsListRU from './RU/collectionsList.json';

import cardsListEN from './EN/cardsList.json';
import cardsListRU from './RU/cardsList.json';

import cardEN from './EN/card.json';
import cardRU from './RU/card.json';

import userSettingsEN from './EN/userSettings.json';
import userSettingsRU from './RU/userSettings.json';

export const resources: Resource = {
  en: {
    common: commonEN,
    authorization: authorizationEN,
    collectionsList: collectionsListEN,
    cardsList: cardsListEN,
    card: cardEN,
    userSettings: userSettingsEN,
  },
  ru: {
    common: commonRU,
    authorization: authorizationRU,
    collectionsList: collectionsListRU,
    cardsList: cardsListRU,
    card: cardRU,
    userSettings: userSettingsRU,
  },
};
