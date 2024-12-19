const API_V1 = '/api/v1';

const routes = {
  getLoginPath: () => `${API_V1}/login`,
  getSignupPath: () => `${API_V1}/signup`,
  getChannelsPath: () => `${API_V1}/channels`,
  getChannelPath: (id) => `${API_V1}/channels/${id}`,
  getMessagesPath: () => `${API_V1}/messages`,
  getMessagePath: (id) => `${API_V1}/messages/${id}`,
  pages: {
    getErrorPage: () => '*',
    getLoginPage: () => '/login',
    getSignupPage: () => '/signup',
    getChatPage: () => '/',
  },
};

export default routes;
