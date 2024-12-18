const baseUrl = '/api/v1';

const routes = {
  getLoginPath: () => `${baseUrl}/login`,
  getSignupPath: () => `${baseUrl}/signup`,
  getChannelsPath: () => `${baseUrl}/channels`,
  getChannelPath: (id) => `${baseUrl}/channels/${id}`,
  getMessagesPath: () => `${baseUrl}/messages`,
  getMessagePath: (id) => `${baseUrl}/messages/${id}`,
  pages: {
    getErrorPage: () => '*',
    getLoginPage: () => '/login',
    getSignupPage: () => '/signup',
    getChatPage: () => '/',
  },
};

export default routes;
