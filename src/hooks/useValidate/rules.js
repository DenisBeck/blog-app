const rules = {
  article: {
    createArticle: {
      title: {
        required: {
          value: true,
          message: 'Title is required',
        },
      },
      description: {
        required: {
          value: true,
          message: 'Description is required',
        },
      },
      body: {
        required: {
          value: true,
          message: 'Text is required',
        },
      },
    },
    editArticle: {
      title: {
        required: {
          value: true,
          message: 'Title is required',
        },
      },
      description: {
        required: {
          value: true,
          message: 'Description is required',
        },
      },
      body: {
        required: {
          value: true,
          message: 'Text is required',
        },
      },
    },
  },

  profile: {
    register: {
      username: {
        required: {
          value: true,
          message: 'Username is required',
        },
        minLength: {
          value: 3,
          message: 'Your name needs to be at least 3 characters',
        },
        maxLength: {
          value: 20,
          message: 'Your name needs to be less than 20 characters',
        },
      },
      email: {
        required: {
          value: true,
          message: 'Email is required',
        },
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Email must match a pattern',
        },
      },
      password: {
        required: {
          value: true,
          message: 'Password is required',
        },
        minLength: {
          value: 6,
          message: 'Your password needs to be at lease 6 characters',
        },
        maxLength: {
          value: 40,
          message: 'Your password needs to be less than 40 characters',
        },
      },
      repeatPassword: {
        required: {
          value: true,
          message: 'Password to confirm is required',
        },
      },
      agreement: {
        required: 'Agreement is required',
      },
    },
    login: {
      email: {
        required: {
          value: true,
          message: 'Email is required',
        },
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Email must match a pattern',
        },
      },
      password: {
        required: {
          value: true,
          message: 'Password is required',
        },
      },
    },
    editProfile: {
      username: {
        required: {
          value: true,
          message: 'Username is required',
        },
      },
      email: {
        required: {
          value: true,
          message: 'Email is required',
        },
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Email must match a pattern',
        },
      },
      password: {
        required: {
          value: true,
          message: 'Password is required',
        },
        minLength: {
          value: 6,
          message: 'Your password needs to be at lease 6 characters',
        },
        maxLength: {
          value: 40,
          message: 'Your password needs to be less than 40 characters',
        },
      },
      image: {
        pattern: {
          value: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
          message: 'URL must match a pattern',
        },
      },
    },
  },
};

export default rules;
