import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Result } from '../helpers/result';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    function logger() {
      console.error(`Request URL: ${request.method} ${request.path}`);
      console.error('Request Headers:', request.headers);
      if (Object.keys(request.query).length > 0)
        console.error('Request Query:', request.query);
      if (Object.keys(request.body).length > 0)
        console.error('Request Body:', request.body);
      if (exception?.response) {
        console.error('Axios', exception.toString());
        if (exception.config.data)
          console.error('Axios Request Data:', exception.config.data);
        console.error('Axios Response Data:', exception?.response.data);
      } else console.error('Exception Error:', exception);
    }

    try {
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      console.log(exception);

      const { message } = exception.response;
      if (message === undefined || message === null) {
        logger();
      }
      response
        .status(status)
        .json(
          Result.message(
            Array.isArray(message)
              ? message.join('\n')
              : message ||
                  'Ocorreu um erro inesperado, tente novamente mais tarde. Erro 502.',
          ),
        );
    } catch (error) {
      logger();
      console.error('Filter Error:', error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          Result.message(
            'Ocorreu um erro inesperado, tente novamente mais tarde.',
          ),
        );
    }
  }
}
