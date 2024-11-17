/* eslint-disable sonarjs/no-hardcoded-credentials */
const en = {
  translation: {
    messagesTab: {
      counter: {
        count_one: '{{count}} message',
        count_other: '{{count}} messages',
      },
      input: {
        placeholder: 'Enter message...',
        aria_label: 'New message',
        sendButton: 'Send',
      },
      errors: {
        socketIoError: 'An error occurred ({{error}}) while sending event ({{evt}}). Resend after 5 seconds',
      },
    },
    channelsTab: {
      dropdownMenu: {
        delete: 'Delete',
        rename: 'Rename',
      },
      channelsList: {
        title: 'Channels',
        addButton: '+',
      },
      errors: {
        socketIoError: 'An error occurred ({{error}}) while sending event ({{evt}}). Resend after 5 seconds',
      },
    },
    modals: {
      add: {
        yupSchema: {
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
      title: 'Hexlet Chat',
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
        axiosErrors: {
          409: 'A user with the same name already exists',
          ERR_NETWORK: 'Network error',
        },
      },
    },
    loginPage: {
      yupSchema: {
        username: {
          min: 'Minimum 2 letters',
          max: 'Maximum 50 letters',
          required: 'Required field',
        },
        password: {
          min: 'Minimum 4 letters',
          max: 'Maximum 50 letters',
          required: 'Required field',
        },
      },
      main: {
        title: 'Log in',
        submitButton: 'Submit',
        inputs: {
          username: 'Username',
          password: 'Password',
        },
        bottom: {
          question: "Don't have an account?",
          registration: 'Registration',
        },
      },
      errors: {
        axiosErrors: {
          401: 'Authorization error: Invalid password + user pair',
          ERR_NETWORK: 'Network error',
        },
      },
    },
    errorPage: {
      main: {
        title: 'Error 404. The requested page was not found!',
      },
    },
  },
};

export default en;
