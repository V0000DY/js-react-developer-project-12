/* eslint-disable sonarjs/no-hardcoded-credentials */
const ru = {
  translation: {
    messagesTab: {
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
      errors: {
        socketIoError: 'При отправке события: {{evt}} произошла ошибка: {{error}}. Повторная отправка через 5 секунд',
      },
    },
    channelsTab: {
      dropdownMenu: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
      channelsList: {
        title: 'Каналы',
        addButton: '+',
      },
      errors: {
        socketIoError: 'При отправке события: {{evt}} произошла ошибка: {{error}}. Повторная отправка через 5 секунд',
      },
    },
    modals: {
      add: {
        yupSchema: {
          min: 'Минимум 3 буквы',
          max: 'Максимум 20 букв',
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
          success: 'Канал добавлен!',
          error: 'При добавлении канала произошла следующая ошибка: ',
        },
      },
      rename: {
        yupSchema: {
          min: 'Минимум 3 буквы',
          max: 'Максимум 20 букв',
          notOneOf: 'Канал с таким именем уже существует!',
        },
        main: {
          title: 'Переименовать канал',
          input: 'Введите новое имя канала',
          resetButton: 'Отменить',
          submitButton: 'Отправить',
        },
        toasts: {
          success: 'Канал переименован!',
          error: 'При переименовании канала произошла следующая ошибка: ',
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
          success: 'Канал удален!',
          error: 'При удалении канала произошла следующая ошибка: ',
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
        axiosErrors: {
          409: 'Такой пользователь уже существует',
          ERR_NETWORK: 'Ошибка соединения',
        },
      },
    },
    loginPage: {
      yupSchema: {
        username: {
          min: 'Минимум 2 буквы',
          max: 'Максимум 50 букв',
          required: 'Обязательное поле',
        },
        password: {
          min: 'Минимум 4 буквы',
          max: 'Максимум 50 букв',
          required: 'Обязательное поле',
        },
      },
      main: {
        title: 'Войти',
        submitButton: 'Войти',
        inputs: {
          username: {
            label: 'Имя пользователя',
            placeholder: 'Введите имя пользователя',
          },
          password: {
            label: 'Пароль',
            placeholder: 'Введите ваш пароль',
          },
        },
        bottom: {
          question: 'Нет аккаунта?',
          registration: 'Регистрация',
        },
      },
      errors: {
        axiosErrors: {
          401: 'Неверные имя пользователя или пароль',
          ERR_NETWORK: 'Ошибка соединения',
        },
      },
    },
    errorPage: {
      main: {
        title: 'Ошибка 404. Запрашиваемая страница не найдена!',
      },
    },
  },
};

export default ru;
