import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import * as path from "path";
import { errorMessage } from "src/error";

export const javacompiler = (dir: string, body: any) => {
    try {
        var className = body?.script.slice(body?.script.indexOf("class") + 5, body?.script.indexOf("{")).trim()
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
        else {
            mkdirSync(dir);
        }
        var fileName = path.join(dir, className)
        if (!existsSync(`${fileName}.java`)) {
            writeFileSync(`${fileName}.java`, body?.script)
        }
        writeFileSync(`${fileName}.txt`, body?.input)
        execSync(`javac ${fileName}.java`)
        let scriptExecution = execSync(`java -classpath ${dir} ${className} <${fileName}.txt`)
        return { message: scriptExecution.toString().trim() }

    } catch (error) {
        error = `${error}`.split(dir + '\\').join('')
        return errorMessage('INTERNAL_SERVER_ERROR', `${error}`)
    }
}