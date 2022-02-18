import { spawnSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { errorMessage } from "src/error";
import * as precise from 'precise'
import * as path from 'path'

export const nodecompiler = (dir: string, vid: string, body: any) => {
    try {
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
        var fileName = path.join(dir, `${vid}.js`)
        if (!existsSync(fileName)) {
            writeFileSync(fileName, body.script)
        }
        let timer = precise().start()
        const scriptExecution = spawnSync('node', [fileName], {
            input: body.input,
        })

        if (timer.stop().diff() / 1000000 > 30) {
            return errorMessage('ACCEPTED', "Time limit exceeded")
        }
        if (scriptExecution.status === 0) {
            return { message: scriptExecution.stdout.toString().trim() }
        } else {
            let error = scriptExecution.stderr.toString().trim().replace(`${dir}\\${vid}`, 'index')
            return errorMessage('ACCEPTED', error)
        }
    } catch (error) {
        error = error.replace(`${dir}\\${vid}`, 'index')
        return errorMessage('INTERNAL_SERVER_ERROR', `${error}`)
    }
}