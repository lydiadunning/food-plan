export const sampleUser = (passwordHash) => {
  return {
    username: 'SampleUser',
    name: 'Sample Sample',
    email: 'sample@legitimatewebsite.org',
    passwordHash: passwordHash,
  }
}

export const sampleKids = (userId) => [
  {
    name: 'Janet',
    outcomes: [
      { outcome: 'poked it' },
      { outcome: 'sniffed it' },
      { outcome: 'tasted it' },
      { outcome: 'ate it' }
    ],
    exposures: [
      {
        food: 'Spinach',
        description: 'raw, dipped in dressing',
        outcomes: [
          {outcome: 'sniffed it', isActive: true},
          {outcome:'tasted it', isActive: true}
        ],
        meal: 'dinner',
        date: '2024-01-01T19:11:04.689Z'
      },
      {
        food: 'Black olives',
        description: 'picked out of a salad',
        outcomes: [
          {outcome:'tasted it', isActive: true},
          {outcome: 'ate it', isActive: true}
        ],
        meal: 'lunch',
        date: '2024-01-02T19:11:04.689Z'
      },
      {
        food: 'apple',
        description: 'sliced',
        outcomes: [
          {outcome: 'sniffed it'},
        ],
        meal: 'afternoon snack',
        date: '2024-01-03T19:11:04.689Z'
      },
      {
        food: 'Spinach',
        description: 'in Quiche',
        outcomes: [
          {outcome:'poked it', isActive: true}
        ],
        meal: 'brunch',
        date: '2024-01-06T19:11:04.689Z'
      },
    ],
    users: [userId]
  },
  {
    name: 'Ben',
    outcomes: [
      { outcome: 'no-thank-you plate' },
      { outcome: 'touched it' },
      { outcome: 'sniffed it' },
      { outcome: 'tasted it' },
    ],
    exposures: [
      {
        food: 'Spinach',
        description: 'raw, with dressing',
        outcomes: [
          {outcome: 'no-thank-you plate', isActive: true},
        ],
        meal: 'dinner',
        date: '2024-01-01T19:11:04.689Z'
      },
      {
        food: 'feta cheese',
        description: 'from my salad',
        outcomes: [
          {outcome:'touched it', isActive: true},
        ],
        meal: 'lunch',
        date: '2024-01-02T19:11:04.689Z'
      },
      {
        food: 'celery',
        outcomes: [
          {outcome: 'touched it'},
        ],
        date: '2024-01-05T19:11:04.689Z'
      },
      {
        food: 'Spinach',
        description: 'in Quiche',
        outcomes: [
          {outcome:'tasted it', isActive: true}
        ],
        meal: 'brunch',
        date: '2024-01-06T19:11:04.689Z'
      },
    ],
    users: [userId]
  },
  {
    name: 'Sam',
    users: [userId]
  },
]