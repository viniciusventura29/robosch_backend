import DialogInterpreter from "./components/DialogInterpreter.js";
import WhatsAppBot from "./components/WhatsAppBot.js";

let botConfig = {
    session: 'session-name',
    headless: true,
    multidevice: true,
    useChrome: true
}

let dialogInterpreter = new DialogInterpreter("interno-robosch-bvfx", "./config/interno-robosch-bvfx-1fbf8c2d87fa.json", "pt-BR");


let bot = new WhatsAppBot(dialogInterpreter, botConfig); 
