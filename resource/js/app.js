import React from 'react';
import ReactDOM from 'react-dom';

import i18n from './i18n';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack

import Crowi from './util/Crowi';
import CrowiRenderer from './util/CrowiRenderer';

import HeaderSearchBox  from './components/HeaderSearchBox';
import SearchPage       from './components/SearchPage';
import PageListSearch   from './components/PageListSearch';
import PageHistory      from './components/PageHistory';
import SeenUserList     from './components/SeenUserList';
//import PageComment  from './components/PageComment';

if (!window) {
  window = {};
}

const mainContent = document.querySelector('#content-main');
let pageId = null;
if (mainContent !== null) {
  pageId = mainContent.attributes['data-page-id'].value;
}

// FIXME
const crowi = new Crowi({me: $('#content-main').data('current-username')}, window);
window.crowi = crowi;
crowi.fetchUsers();

i18n.changeLanguage(crowi.userById[$('body').data('me')].lang);

const crowiRenderer = new CrowiRenderer();
window.crowiRenderer = crowiRenderer;

const componentMappings = {
  'search-top': <I18nextProvider i18n={i18n}><HeaderSearchBox /></I18nextProvider>,
  'search-page': <SearchPage />,
  'page-list-search': <PageListSearch />,
  //'revision-history': <PageHistory pageId={pageId} />,
  //'page-comment': <PageComment />,
  'seen-user-list': <SeenUserList />,
};

Object.keys(componentMappings).forEach((key) => {
  const elem = document.getElementById(key);
  if (elem) {
    ReactDOM.render(componentMappings[key], elem);
  }
});

// うわーもうー
$('a[data-toggle="tab"][href="#revision-history"]').on('show.bs.tab', function() {
  ReactDOM.render(<PageHistory pageId={pageId} crowi={crowi} />, document.getElementById('revision-history'));
});
