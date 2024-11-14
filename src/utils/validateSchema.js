export const validateUserSchema = {
  firstName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: "first name must be of atleast 3 character.",
    },
    isString: {
      errorMessage: "first name must be a string.",
    },
    notEmpty: {
      errorMessage: "first name must not be a empty field.",
    },
  },
  lastName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: "last name must be of atleast 3 character.",
    },
    isString: {
      errorMessage: "last name must be a string.",
    },
    notEmpty: {
      errorMessage: "last name must not be a empty field.",
    },
  },
  email: {
    isEmail: {
      errorMessage: "invalid email address.",
    },
    isString: {
      errorMessage: "email must be a string.",
    },
    notEmpty: {
      errorMessage: "email must not be a empty field.",
    },
  },
  password: {
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: "password must be of atleast 6 character.",
    },
    notEmpty: {
      errorMessage: "email must not be a empty field.",
    },
  },
  bio: {
    isString: {
      errorMessage: "Invalid data. Data should be type of string",
    },
  },
  role: {
    isIn: {
      options: [["user", "admin"]],
      errorMessage: "role must be either 'user' or 'admin'.",
    },
  },
};
