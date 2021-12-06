import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";

export default class FakeHashProvider implements IMailProvider{
    private message: ISendMailDTO[] = []

    public async sendEmail(message: ISendMailDTO): Promise<void>{
        this.message.push(message)
    }
}
