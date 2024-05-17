import { dirname } from 'path';
import {fileURLToPath} from 'url';
import crypto from "crypto"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default __dirname

const SECRET = "CODER123"
export const generaHash = password => crypto.createHmac("sha256",SECRET).update(password).digest("hex")