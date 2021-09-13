import IMailProvider from "../models/IMailProvider";

interface Message {
    to: string;
    body: string;
}

export default class FakeHashProvider implements IMailProvider{
    private message: Message[] = []

    public async sendEmail(to: string, body: string): Promise<void>{
        this.message.push({
            to,
            body,
        })
    }
}
