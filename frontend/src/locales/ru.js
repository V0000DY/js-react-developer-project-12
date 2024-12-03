const ru = {
  translation: {
    messagesTab: {
      messageForm: {
        error: 'При отправке сообщения произошла Ошибка соединения: ',
      },
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      input: {
        placeholder: 'Введите сообщение...',
        aria_label: 'Новое сообщение',
        sendButton: 'Отправить',
      },
      error: 'При получении списка сообщений произошла Ошибка соединения: {{error}}. Обновите запрос позже',
    },
    channelsTab: {
      dropdownMenu: {
        toggleMenu: 'Управление каналом',
        delete: 'Удалить',
        rename: 'Переименовать',
      },
      channelsList: {
        title: 'Каналы',
        addButton: '+',
      },
      error: 'При получении списка каналов произошла Ошибка соединения: {{error}}. Обновите запрос позже',
    },
    modals: {
      add: {
        yupSchema: {
          charCount: 'От 3 до 20 символов',
          required: 'Введите новое имя канала',
          notOneOf: 'Канал с таким именем уже существует!',
        },
        main: {
          title: 'Добавить канал',
          input: 'Введите имя канала',
          resetButton: 'Отменить',
          submitButton: 'Отправить',
        },
        toasts: {
          success: 'Канал создан',
          error: 'При добавлении канала произошла Ошибка соединения: ',
        },
      },
      rename: {
        yupSchema: {
          charCount: 'От 3 до 20 символов',
          notOneOf: 'Канал с таким именем уже существует!',
        },
        main: {
          title: 'Переименовать канал',
          input: 'Введите новое имя канала',
          resetButton: 'Отменить',
          submitButton: 'Отправить',
        },
        toasts: {
          success: 'Канал переименован',
          error: 'При переименовании канала произошла Ошибка соединения: ',
        },
      },
      remove: {
        main: {
          title: 'Удалить канал',
          caution: 'Уверены?',
          resetButton: 'Отменить',
          submitButton: 'Удалить',
        },
        toasts: {
          success: 'Канал удалён',
          error: 'При удалении канала произошла Ошибка соединения: ',
        },
      },
    },
    navBarComp: {
      title: 'Hexlet Chat',
      logOutButton: 'Выйти',
      toggleRuLang: 'Русский',
      toggleEnLang: 'Английский',
    },
    signupPage: {
      yupSchema: {
        username: {
          charCount: 'От 3 до 20 символов',
          required: 'Обязательное поле',
        },
        password: {
          min: 'Не менее 6 символов',
          required: 'Обязательное поле',
        },
        confirmPassword: {
          oneOf: 'Пароли должны совпадать',
          required: 'Обязательное поле',
        },
      },
      main: {
        title: 'Регистрация',
        submitButton: 'Зарегистрироваться',
        inputs: {
          username: 'Имя пользователя',
          password: 'Пароль',
          confirmPassword: 'Подтвердите пароль',
        },
      },
      errors: {
        409: 'Такой пользователь уже существует',
        FETCH_ERROR: 'Не удалось зарегистрироваться. Ошибка соединения. Попробуйте позже.',
      },
    },
    loginPage: {
      yupSchema: {
        username: {
          min: 'Неверные имя пользователя или пароль',
          max: 'Неверные имя пользователя или пароль',
          required: 'Обязательное поле',
        },
        password: {
          min: 'Неверные имя пользователя или пароль',
          max: 'Неверные имя пользователя или пароль',
          required: 'Обязательное поле',
        },
      },
      main: {
        title: 'Войти',
        submitButton: 'Войти',
        inputs: {
          username: {
            label: 'Ваш ник',
            placeholder: 'Ваш ник',
          },
          password: {
            label: 'Пароль',
            placeholder: 'Пароль',
          },
        },
        bottom: {
          question: 'Нет аккаунта?',
          registration: 'Регистрация',
        },
      },
      errors: {
        401: 'Неверные имя пользователя или пароль',
        FETCH_ERROR: 'Не удалось войти. Ошибка соединения. Попробуйте позже.',
      },
    },
    errorPage: {
      main: 'Страница не найдена',
      p: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
  },
};

export default ru;
