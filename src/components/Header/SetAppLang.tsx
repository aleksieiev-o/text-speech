import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { Locale } from '../../store/SettingsStore';
import { useSettingsStore } from '../../store/hooks';

export enum AppLangTitle {
  EN_US = 'English',
  RU_RU = 'Русский',
}

const SetAppLang: FC = (): ReactElement => {
  const [language, setLanguage] = useState<Locale>(Locale.EN_US);
  const { t, i18n } = useTranslation(['common']);
  const settingsStore = useSettingsStore();

  const languages: Array<{ title: AppLangTitle, lang: Locale }> = [
    { title: AppLangTitle.EN_US, lang: Locale.EN_US },
    { title: AppLangTitle.RU_RU, lang: Locale.RU_RU },
  ];

  const updateLocale = async (lang: Locale): Promise<void> => {
    await i18n.changeLanguage(lang);
    await setLanguage(lang);
  };

  const changeLocale = async (lang: Locale): Promise<void> => {
    await settingsStore.updateLocale(lang);
    await updateLocale(lang);
  };

  useEffect(() => {
    updateLocale(settingsStore.locale || Locale.EN_US);
  }, []);

  return (
    <Menu>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <MenuButton
        as={IconButton}
        colorScheme={'gray'}
        variant={'outline'}
        boxShadow={'md'}
        title={t('common_set_app_lang_title')!}
        aria-label={'Set application language'}
        icon={<Icon as={LanguageIcon}/>}/>

      <MenuList>
        {
          languages.map((menuItem) => {
            return <MenuItem
              onClick={() => changeLocale(menuItem.lang)}
              key={menuItem.lang}
              color={language === menuItem.lang ? 'telegram.600' : ''}>
              {menuItem.title}
            </MenuItem>;
          })
        }
      </MenuList>
      {/* eslint-enable */}
    </Menu>
  );
};

export default SetAppLang;
