
export const secondaryNavItems = [
  {
    text: 'Secondary Link',
    id: 'request',
    selected: true,
    path: ''
  },
  {
    text: 'Custom Template Link',
    id: 'messages',
  },
];

export const primaryNavItems = [
  {
    text: 'Home',
    id: 'home',
    // Including children link in data model adds them in as submenu
    children: [
      {
        text: 'Item 1',
        id: 'homeChild1',
        path: '',
      },
      {
        text: 'Item 2',
        id: 'homeChild2',
        path: '',
      },
      {
        text: 'Item 3',
        id: 'homeChild3',
        path: '',
      }
    ],
  },
  {
    text: 'Search',
    id: 'search',
    isMegamenu: true, // Defining megamenu with children will display the submenu as a megamenu
    children: [
      {
        text: 'Item 1',
        id: 'homeChild1',  
        path: '',
      },
      {
        text: 'Item 2',
        id: 'homeChild2',
        path: '',
      },
      {
        text: 'Item 3',
        id: 'homeChild3',
        path: '',
      },
    ],
  },
  {
    text: 'Databank',
    id: 'databank',
  },
];