import { Response } from 'express';
import { 
  SUCCESSFULLY_RESPONSE_TEXT,
  BAD_REQUEST_RESPONSE_TEXT,
  NOT_FOUND_RESPONSE_TEXT,  
} from '@Constants/response';


function responseEntiny(res: Response, { status, data }: { status?: number, data: {} }) {
    res
      .status(status || 200)
      .json({
        data: data || {}
      });
}

function responseList(res: Response, { status, data }: { status?: number, data: any[] }) {
    res
      .status(status || 200)
      .json({
        data: data || [],
        count: data.length
      });
}


function responseMessage(res: Response, { status, message }: { status?: number, message?: string }) {
    res
      .status(status || 200)
      .json({ message: message || SUCCESSFULLY_RESPONSE_TEXT,});
}

function response404(res: Response, { message }: { message?: string }) {
  res
    .status(404)
    .json({ message: message || NOT_FOUND_RESPONSE_TEXT});
}

function responseErrorMessage(res: Response, { status, message }: { status?: number, message?: string }) {
  res
    .status(status || 400)
    .json({ message: message || BAD_REQUEST_RESPONSE_TEXT});
}

// TODO: TEMPORARY SOLUTIONS (clientsID)
function responseWSS({ data, clientsID }: { data: {}, clientsID: string[] }) {
  return {
    data,
    clientsID
  }
}

export {
    responseEntiny,
    responseList,
    responseMessage,
    response404,
    responseErrorMessage,
    responseWSS
}