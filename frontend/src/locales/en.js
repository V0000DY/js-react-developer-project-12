const en = {
  translation: {
    messages: {
      messageForm: {
        error: 'An error occurred while sending your message: ',
      },
      counter: {
        count_one: '{{count}} message',
        count_other: '{{count}} messages',
      },
      input: {
        placeholder: 'Enter message...',
        aria_label: 'New message',
        sendButton: 'Send',
      },
      error: 'An error occurred while retrieving the list of messages: {{error}}. Please update your request later.',
    },
    channels: {
      dropdownMenu: {
        delete: 'Delete',
        rename: 'Rename',
      },
      sideBar: {
        title: 'Choose a channel',
        button: 'Channels',
      },
      channelsList: {
        title: 'Channels',
        addButton: '+',
      },
      error: 'An error occurred while retrieving the channel list: {{error}}. Please update your request later.',
    },
    modals: {
      add: {
        yupSchema: {
          charCount: 'From 3 to 20 characters',
          required: 'Enter new channel name',
          notOneOf: 'A channel with same name already exists!',
        },
        main: {
          title: 'Add channel',
          input: 'Enter channel name',
          resetButton: 'Reset',
          submitButton: 'Submit',
        },
        toasts: {
          success: 'The channel has been added!',
          error: 'The following error occurred while adding a channel: ',
        },
      },
      rename: {
        yupSchema: {
          charCount: 'From 3 to 20 characters',
          notOneOf: 'A channel with same name already exists!',
        },
        main: {
          title: 'Rename the channel',
          input: 'Enter new channel name',
          resetButton: 'Reset',
          submitButton: 'Submit',
        },
        toasts: {
          success: 'The channel has been renamed!',
          error: 'The following error occurred while renaming a channel: ',
        },
      },
      remove: {
        main: {
          title: 'Delete the channel',
          caution: 'Sure?',
          resetButton: 'Reset',
          submitButton: 'Delete',
        },
        toasts: {
          success: 'The channel has been deleted!',
          error: 'The following error occurred while deleting a channel: ',
        },
      },
    },
    navBarComp: {
      title: 'Simple Chat',
      logOutButton: 'Log out',
      toggleRuLang: 'Russian',
      toggleEnLang: 'English',
    },
    signupPage: {
      yupSchema: {
        username: {
          charCount: 'From 3 to 20 characters',
          required: 'Required field',
        },
        password: {
          min: 'Minimum password length 4 letters',
          required: 'Required field',
        },
        confirmPassword: {
          oneOf: 'Password mismatch',
          required: 'Required field',
        },
      },
      main: {
        title: 'Registration',
        submitButton: 'Sign up',
        inputs: {
          username: 'Username',
          password: 'Password',
          confirmPassword: 'Confirm the password',
        },
      },
      errors: {
        409: 'A user with the same name already exists',
        FETCH_ERROR: 'Failed to sign up. Connection error. Try again later.',
      },
    },
    loginPage: {
      yupSchema: {
        username: {
          min: 'Authorization error: Invalid password or username',
          max: 'Authorization error: Invalid password or username',
          required: 'Required field',
        },
        password: {
          min: 'Authorization error: Invalid password or username',
          max: 'Authorization error: Invalid password or username',
          required: 'Required field',
        },
      },
      main: {
        title: 'Log in',
        submitButton: 'Submit',
        inputs: {
          username: {
            label: 'Username',
            placeholder: 'Enter your username',
          },
          password: {
            label: 'Password',
            placeholder: 'Enter your password',
          },
        },
        bottom: {
          question: "Don't have an account?",
          registration: 'Registration',
        },
      },
      errors: {
        401: 'Authorization error: Invalid password or username',
        FETCH_ERROR: 'Failed to log in. Connection error. Try again later.',
      },
    },
    errorPage: {
      main: 'Page not found',
      p: 'But you can go ',
      link: 'to main page',
    },
  },
};

export default en;
