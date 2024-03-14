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
        socketIoError: 'При отправке события {{evt}} произошла ошибка {{error}}. Повторная отправка через 2 секунды',
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
        socketIoError: 'При отправке события {{evt}} произошла ошибка {{error}}. Повторная отправка через 2 секунды',
      },
    },
    modals: {
      add: {
        yupSchema: {
          required: 'Введите новое имя канала',
          notOneOf: 'Канал с таким именем уже существует!',
        },
        main: {
          title: 'Добавить канал',
          input: 'Введите имя канала',
          resetButton: 'Отменить',
          submitButton: 'Отправить',
        },
      },
      rename: {
        yupSchema: {
          notOneOf: 'Канал с таким именем уже существует!',
        },
        main: {
          title: 'Переименовать канал',
          input: 'Введите новое имя канала',
          resetButton: 'Отменить',
          submitButton: 'Отправить',
        },
      },
      remove: {
        main: {
          title: 'Удалить канал',
          caution: 'Уверены?',
          resetButton: 'Отменить',
          submitButton: 'Удалить',
        },
      },
    },
    navBarComp: {
      title: 'Hexlet Chat',
      logOutButton: 'Выйти',
    },
    signupPage: {
      yupSchema: {
        username: {
          charCount: 'От 3 до 20 символов',
          required: 'Обязательное поле',
        },
        password: {
          min: 'Минимумальная длина пароля 4 буквы',
          required: 'Обязательное поле',
        },
        confirmPassword: {
          oneOf: 'Пароли не совпадают',
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
          401: 'Ошибка авторизации: Неверная пара пароль + пользователь',
          409: 'Пользователь с таким именем уже существует',
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
          username: 'Имя пользователя',
          password: 'Пароль',
        },
        bottom: {
          question: 'Нет аккаунта?',
          registration: 'Регистрация',
        },
      },
      errors: {
        axiosErrors: {
          401: 'Ошибка авторизации: Неверная пара пароль + пользователь',
          409: 'Пользователь с таким именем уже существует',
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
