import swaggerJsdoc from 'swagger-jsdoc';
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de API',
    version: '1.0.1',
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      authLogin: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
        example: {
          email: 'test@email.com',
          password: '123456',
        },
      },
      authRegister: {
        type: 'object',
        required: ['email', 'password', 'confirmPassword'],
        properties: {
          name: {
            type: 'string',
            description: 'the name of the user',
          },
          email: {
            type: 'string',
            description: 'the email of the user',
          },
          password: {
            type: 'string',
            description: 'the password of the user',
          },
          confirmPassword: {
            type: 'string',
            description: 'the password confirm of the user',
          },
        },
        example: {
          name: 'test',
          email: 'test@email.com',
          password: '123456',
          confirmPassword: '123456',
        },
      },
      authForgotPassword: {
        type: 'object',
        required: ['email'],
        properties: {
          email: {
            type: 'string',
          },
        },
        example: {
          email: 'test@email.com',
        },
      },
      Bicycle: {
        type: 'object',
        properties: {
          color: {
            type: 'string',
          },
          model: {
            type: 'string',
          },
        },
        example: {
          color: 'Rojo',
          model: 'X1',
        },
      },
      Reserve: {
        type: 'object',
        properties: {
          user: {
            type: 'string',
          },
          bicycle: {
            type: 'string',
          },
          from: {
            type: 'string',
            format: 'date-time',
          },
          to: {
            type: 'string',
            format: 'date-time',
          },
        },
        example: {
          user: '1234567890abcdef12345678',
          bicycle: '1234567890abcdef12345678',
          from: '03-05-2022',
          to: '05-05-2022',
        },
      },
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
    },
    parameters: {
      token: {
        in: 'path',
        name: 'token',
        required: true,
        schema: {
          type: 'string',
          example: '1234567890abcdef0987654321fedcba',
        },
        description: 'the token',
      },
    },
    responses: {
      tokenNotFound: {
        type: 'object',
        properties: {
          msg: {
            type: 'string',
            description: 'A message for the not found token',
          },
          statusCode: {
            type: 'number',
            description: 'A message for the status code',
          },
        },
        example: {
          statusCode: 400,
          msg: 'We did not find a user with this token.',
        },
      },
      userNotFound: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            description: 'A message for the status code',
          },
          msg: {
            type: 'string',
            description: 'A message for the not found token',
          },
        },
        example: {
          statusCode: 404,
          msg: 'User not found!',
        },
      },
      accountActived: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            description: 'A message for the id user',
          },
          msg: {
            type: 'string',
            description: 'A message for the actived account',
          },
        },
        example: {
          data: '1234567890abcdef09876543',
          msg: 'Account actived!',
        },
      },
      accountCreated: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'the name of the user',
              },
              email: {
                type: 'string',
                description: 'the email of the user',
              },
              role: {
                type: 'string',
                description: 'the role of the user',
              },
              _id: {
                type: 'string',
                description: 'the id of the user',
              },
            },
          },
          msg: {
            type: 'string',
            description: 'A message for the actived account',
          },
        },
        example: {
          data: {
            name: 'test',
            email: 'test@email.com',
            role: 'Customer',
            _id: '1234567890abcdef09876543',
          },
          msg: 'account confirmation email sent!',
        },
      },
      emailAlreadyExists: {
        properties: {
          statusCode: {
            type: 'number',
            description: 'A message for the status code',
          },
          msg: {
            type: 'string',
            description: 'A message for the email already exists',
          },
        },
        example: {
          statusCode: 400,
          msg: 'The email already exists, try again!',
        },
      },
      forgotPassword: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            description: 'A message for the id user',
          },
          msg: {
            type: 'string',
            description: 'A message for the reset password',
          },
        },
        example: {
          data: '1234567890abcdef09876543',
          msg: 'email was sent to reset the password!',
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['src/controllers/*.ts'],
};

const openApiConfiguration = swaggerJsdoc(options);

export default openApiConfiguration;
