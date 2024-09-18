const getValidateFields = (formType) => {
  switch (formType) {
    case 'register':
      return [
        { value: 'username', label: 'Username', type: 'text' },
        { value: 'email', label: 'Email', type: 'email' },
        { value: 'password', label: 'Password', type: 'password' },
        { value: 'repeatPassword', label: 'Repeat Password', type: 'password' },
        { value: 'agreement', label: 'I agree to the processing of my personal information', type: 'checkbox' },
      ];
    case 'login':
      return [
        { value: 'email', label: 'Email', type: 'email' },
        { value: 'password', label: 'Password', type: 'password' },
      ];
    case 'editProfile':
      return [
        { value: 'username', label: 'Username', type: 'text' },
        { value: 'email', label: 'Email', type: 'email' },
        { value: 'password', label: 'New Password', type: 'password' },
        { value: 'image', label: 'Image', type: 'text' },
      ];
    case 'editArticle':
    case 'createArticle':
      return [
        { value: 'title', label: 'Title', type: 'text' },
        { value: 'description', label: 'Short description', type: 'text' },
        { value: 'body', label: 'Text', type: 'text' },
      ];
    default:
      return [];
  }
};

export default getValidateFields;
