import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        description: 'Welcome to the API Documentation. This comprehensive Swagger documentation provides detailed information about the endpoints, request parameters, response formats, and authentication methods for our RESTful API.',
        version: "1.0",
      },
      // components: {
      //   securitySchemes: {
      //     BearerAuth: {
      //       type: "http",
      //       scheme: "bearer",
      //       bearerFormat: "JWT",
      //     },
      //   },
      // },
      security: [],
    },
  });
  return spec;
};
